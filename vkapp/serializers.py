from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import VKUser, Food
from datetime import datetime


class VKUserSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = VKUser
        geo_field = "location_coordinates"
        fields = "__all__"
        extra_kwargs = {"location_title": {"required": False}}

    def create(self, validated_data):
        # TODO: Update user instance with updated fields in VK
        vk_id = validated_data.get("vk_id", None)
        if vk_id is not None:
            user = VKUser.objects.filter(vk_id=vk_id).first()
            if user is not None:
                return user
        user = VKUser.objects.create(**validated_data)
        return user


class FoodNearestSerializer(serializers.ModelSerializer):
    user = VKUserSerializer()
    distance = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()

    def get_distance(self, obj):
        return obj.distance.m

    def get_duration(self, obj):
        return obj.get_duration()

    class Meta:
        model = Food
        fields = "__all__"
        extra_kwargs = {"status": {"required": False}}


class FoodSerializer(serializers.ModelSerializer):
    user = VKUserSerializer()
    duration = serializers.SerializerMethodField()

    def get_duration(self, obj):
        return obj.get_duration()

    class Meta:
        model = Food
        fields = "__all__"
        extra_kwargs = {"status": {"required": False}}

