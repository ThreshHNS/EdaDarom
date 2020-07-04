import sys
import os
from PIL import Image, ImageOps
from io import BytesIO
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from datetime import timedelta
from django.contrib.gis.db.models import PointField
from django.core.files.uploadedfile import InMemoryUploadedFile
from .managers import VKUserManager
from .utils import path_and_rename


class VKUser(AbstractUser):
    """
	VK User
	"""

    vk_id = models.IntegerField("VK ID", unique=True)
    first_name = models.CharField("Имя", max_length=16)
    last_name = models.CharField("Фамилия", max_length=16)
    city = models.CharField("Город", max_length=28, null=True, blank=True)
    country = models.CharField("Страна", max_length=42, null=True, blank=True)
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

    DONE = "Done"
    ACTIVE = "Active"
    OUTDATED = "Outdated"
    CANCELED = "Canceled"
    STATUS_CHOICES = (
        (DONE, "Done"),
        (ACTIVE, "Active"),
        (OUTDATED, "Outdated"),
        (CANCELED, "Canceled"),
    )

    user = models.ForeignKey("VKUser", on_delete=models.CASCADE)

    publication_date = models.DateTimeField("Дата размещения", auto_now_add=True)
    duration_days = models.IntegerField("Продолжительность")
    end_date = models.DateTimeField("Дата завершения", blank=True, null=True)
    image = models.ImageField("Изображение", upload_to=path_and_rename)
    image_preview = models.ImageField(
        "Предпросмотр", upload_to=path_and_rename, blank=True, null=True
    )
    title = models.TextField("Заголовок")
    description = models.TextField("Описание", blank=True, null=True)
    status = models.CharField("Статус", max_length=8, choices=STATUS_CHOICES, default=ACTIVE)

    def compress_image(self, file, mode="resize"):
        imageTemproary = Image.open(file)
        outputIoStream = BytesIO()
        if mode is "resize":
            width = imageTemproary.size[0]
            height = imageTemproary.size[1]
            new_height = settings.FOOD_IMAGE_HEIGHT * 3 
            new_width = int(new_height * width / height)
            imageTemproaryResized = imageTemproary.resize(
                (new_width, new_height), Image.ANTIALIAS
            )
        elif mode is "fit":
            width = settings.FOOD_IMAGE_WIDTH
            height = settings.FOOD_IMAGE_HEIGHT
            imageTemproaryResized = ImageOps.fit(
                imageTemproary, (width * 3, height * 3), Image.ANTIALIAS
            )
        imageTemproaryResized.save(
            outputIoStream, format="JPEG", optimize=True, quality=100
        )
        outputIoStream.seek(0)
        uploaded_image = InMemoryUploadedFile(
            outputIoStream,
            "ImageField",
            "%s.jpg" % file.name.split(".")[0],
            "image/jpeg",
            sys.getsizeof(outputIoStream),
            None,
        )
        return uploaded_image

    def save(self, *args, **kwargs):
        if not self.id:
            days = timedelta(days=self.duration_days)
            self.end_date = timezone.now() + days
            self.image = self.compress_image(self.image)
            self.image_preview = self.compress_image(self.image, mode="fit")
        super(Food, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} - {self.title}"

