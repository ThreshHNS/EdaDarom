from datetime import timedelta
from django.utils import timezone
from django_celery_beat.models import CrontabSchedule
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth import get_user_model
import requests
from .models import Food

User = get_user_model()

@receiver(pre_save, sender=User)
def pre_save_user_handler(sender, instance, *args, **kwargs):
    if instance.location_coordinates and not (instance.location_title or instance.is_superuser):
        apikey = settings.YANDEX_SECRET_KEY
        location_coordinates = instance.location_coordinates
        coordinates = ",".join(str(x) for x in location_coordinates[::-1])
        base_url = "https://geocode-maps.yandex.ru/1.x"
        params = {"geocode": coordinates, "apikey": apikey, "format": "json"}
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        places_found = response.json()["response"]["GeoObjectCollection"][
            "featureMember"
        ]
        most_relevant = places_found[0]["GeoObject"]
        address = most_relevant["description"]
        title = most_relevant["name"]
        city, country = address.split(", ", 1)
        instance.location_title = title
        instance.city = city
        instance.country = country


@receiver(pre_save, sender=Food)
def pre_save_food_handler(sender, instance, update_fields, *args, **kwargs):
    try:
        food = sender.objects.get(pk=instance.pk)
        if food.image != instance.image:
            food.image.delete(False)
            food.image_preview.delete(False)
    except sender.DoesNotExist:
        pass
    days = timedelta(days=instance.duration_days)
    instance.end_date = timezone.now() + days
    instance.image = instance.compress_image(instance.image)
    instance.image_preview = instance.compress_image(instance.image, mode="fit")


@receiver(post_delete, sender=Food)
def post_delete_food_handler(sender, instance, *args, **kwargs):
    instance.image.delete(False)
    instance.image_preview.delete(False)
