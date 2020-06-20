from django.contrib import admin
from .models import VKUser, Food

@admin.register(VKUser)
class VKUserAdmin(admin.ModelAdmin):
    pass

@admin.register(Food)
class VKUserAdmin(admin.ModelAdmin):
    pass