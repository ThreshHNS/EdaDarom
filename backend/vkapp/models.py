from django.db import models

# Create your models here.

class VKUser(models.Model):
	"""
	VK User
	"""

	vk_id = models.IntegerField()

	first_name = models.TextField()
	avatar_url = models.TextField(null=True, blank=True)
	location_coordinates = models.TextField()
	location_title = models.TextField()

	notifications_radius = models.IntegerField(default=1)  # km (1-10)
	notifications_status = models.BooleanField()

	medal = models.IntegerField(default=0)  # 0 - no, 1 - bronze, 2 - silver, 3 - gold

	def __str__(self):
		return str(self.vk_id) + ' (' + str(self.first_name) + ')'


class food(models.Model):
	"""
	Advertisement about free food
	"""

	user_id = models.ForeignKey('VKUser', on_delete=models.CASCADE)

	publication_date = models.DateField(auto_now_add=True)
	duration = models.IntegerField(default=5)  # days (1-30)
	photo_url = models.TextField()
	title = models.TextField()
	description = models.TextField()
	status = models.IntegerField(default=0)  # 0 - active, 1 - done, 2 - outdated, -1 - cancelled