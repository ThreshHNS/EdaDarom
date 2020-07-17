from django.utils import timezone
from celery import shared_task
from .models import Food

@shared_task
def expired_food_status():
    food = Food.objects.filter(end_date__lt=timezone.now())
    food.update(status="Outdated")
