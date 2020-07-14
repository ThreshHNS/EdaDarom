from django.contrib import admin
from django.forms.widgets import TextInput
from django.contrib.gis.db import models
from .models import VKUser, Food

@admin.register(VKUser)
class VKUserAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.PointField: {'widget': TextInput }
    }

@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    pass
