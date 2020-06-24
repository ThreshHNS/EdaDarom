from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from datetime import timedelta
from django.contrib.gis.db.models import PointField
from .managers import VKUserManager
from .utils import path_and_rename


class VKUser(AbstractUser):
    """
	VK User
	"""

    vk_id = models.IntegerField("VK ID", unique=True)
    first_name = models.CharField("Имя", max_length=16)
    last_name = models.CharField("Фамилия", max_length=16)
    avatar_url = models.TextField("Аватар", null=True, blank=True)
    location_coordinates = PointField("Координаты", null=True, blank=True)
    location_title = models.TextField("Адрес", blank=True, null=True)
    notifications_radius = models.IntegerField("Радиус", default=1)  # km (1-10)
    notifications_status = models.BooleanField("Статус оповещения", default=True)

    USERNAME_FIELD = "vk_id"
    objects = VKUserManager()

    medal = models.IntegerField(
        default=0, blank=True, null=True
    )  # 0 - no, 1 - bronze, 2 - silver, 3 - gold

    def __str__(self):
        return f"{self.vk_id} ({self.first_name})"


class Food(models.Model):
    """
	Advertisement about free food
	"""

    DONE = 0
    ACTIVE = 1
    OUTDATED = 2
    CANCELED = -1
    STATUS_CHOICES = (
        (DONE, "Done"),
        (ACTIVE, "Active"),
        (OUTDATED, "Outdated"),
        (CANCELED, "Canceled"),
    )

    user = models.ForeignKey("VKUser", on_delete=models.CASCADE)

    publication_date = models.DateTimeField("Дата размещения", auto_now_add=True)
    duration = models.DurationField("Продолжительность")  # days (1-30)
    image = models.ImageField("Изображение", upload_to=path_and_rename, blank=True)
    title = models.TextField("Заголовок")
    description = models.TextField("Описание")
    status = models.SmallIntegerField("Статус", choices=STATUS_CHOICES, default=ACTIVE)

    def get_duration(self):
        return self.publication_date + self.duration

    def __str__(self):
        return f"{self.user} - {self.title}"

