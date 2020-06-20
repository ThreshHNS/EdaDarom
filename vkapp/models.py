from django.db import models
from django.contrib.gis.db import models
from .utils import path_and_rename


class VKUser(models.Model):
	"""
	VK User
	"""

	vk_id = models.IntegerField()

	first_name = models.CharField(max_length=16)
	avatar_url = models.URLField(null=True, blank=True)
	location_coordinates = models.PointField(null=False, blank=False, srid=4326, verbose_name='Location')
	location_title = models.TextField()
	notifications_radius = models.IntegerField(default=1)  # km (1-10)
	notifications_status = models.BooleanField()

	medal = models.IntegerField(default=0)  # 0 - no, 1 - bronze, 2 - silver, 3 - gold

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
	STATUS_CHOICES = ((DONE, 'Done'), (ACTIVE, 'Active'),
						(OUTDATED, 'Outdated'), (CANCELED, 'Canceled'),)

	user = models.ForeignKey('VKUser', on_delete=models.CASCADE)

	publication_date = models.DateField(auto_now_add=True)
	duration = models.IntegerField(default=5)  # days (1-30)
	photo_url = models.ImageField('Изображение', upload_to=path_and_rename, blank=True)
	title = models.TextField()
	description = models.TextField()
	status = models.SmallIntegerField(choices=STATUS_CHOICES, default=DONE)

	def __str__(self):
		return f"{self.user} - {self.title}"
