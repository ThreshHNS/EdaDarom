from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import VKUser, Food
from datetime import datetime

User = get_user_model()


class VKUserSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = User
        geo_field = "location_coordinates"
        exclude = (
            "username",
            "password",
            "email",
            "last_login",
            "groups",
            "user_permissions",
        )
        extra_kwargs = {
            "location_title": {"required": False},
            "vk_id": {"required": False},
            "first_name": {"required": False},
            "last_name": {"required": False},
            "is_active": {"required": False, "read_only": True},
            "is_staff": {"required": False, "read_only": True},
            "is_superuser": {"required": False, "read_only": True},
        }


class FoodAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['location_title', 'vk_id']


class UserCreateSerializer(GeoFeatureModelSerializer):
    query_params = serializers.CharField()

    class Meta:
        model = User
        geo_field = "location_coordinates"
        exclude = ("username", "password")
        extra_kwargs = {"location_title": {"required": False}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    query_params = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"
        read_only_fields = ("user",)
        extra_kwargs = {"status": {"required": False}}


class FoodNearestSerializer(serializers.ModelSerializer):
    user = FoodAuthorSerializer()
    distance = serializers.SerializerMethodField()

    def get_distance(self, obj):
        return obj.distance.m

    class Meta:
        model = Food
        fields = "__all__"
        extra_kwargs = {"status": {"required": False}}


class FoodOwnSerializer(serializers.ModelSerializer):
    user = FoodAuthorSerializer()

    class Meta:
        model = Food
        fields = "__all__"
        extra_kwargs = {"status": {"required": False}}

