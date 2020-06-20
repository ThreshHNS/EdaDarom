from rest_framework import serializers
from .models import VKUser


class VKUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = VKUser
        fields = '__all__'
