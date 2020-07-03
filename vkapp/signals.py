from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.conf import settings
import requests
from .models import VKUser


@receiver(pre_save, sender=VKUser)
def pre_save_handler(sender, instance, *args, **kwargs):
    if not (instance.location_title or instance.is_superuser):
        apikey = settings.YANDEX_SECRET_KEY
        location_coordinates = instance.location_coordinates
        coordinates = ",".join(str(x) for x in location_coordinates[::-1])
        base_url = "https://geocode-maps.yandex.ru/1.x"
        params = {"geocode": coordinates, "apikey": apikey, "format": "json"}
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        places_found = response.json()['response']['GeoObjectCollection']['featureMember']
        most_relevant = places_found[0]['GeoObject']
        address = most_relevant['description']
        title = most_relevant['name']
        city, country = address.split(", ", 1)
        instance.location_title = title
        instance.city = city
        instance.country = country