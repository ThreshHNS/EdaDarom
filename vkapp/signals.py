from django.db.models.signals import post_save
from django.dispatch import receiver
import requests
from .models import VKUser


@receiver(post_save, sender=VKUser)
def post_save_handler(sender, instance, created, **kwargs):
    # if not instance.location_title:
    #     apikey = "7e52a3c0-8001-4915-8e58-352f138cbac9"
    #     lon, lat = instance.location_coordinates
    #     url = f"https://geocode-maps.yandex.ru/1.x/?format=json&apikey={apikey}&geocode={lon},{lat}"
    #     r = requests.get(url)
    #     print(r.json())