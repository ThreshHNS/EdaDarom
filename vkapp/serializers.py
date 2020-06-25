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
        exclude = ("username", "password")
        extra_kwargs = {"location_title": {"required": False}}


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
    user = VKUserSerializer()
    distance = serializers.SerializerMethodField()

    def get_distance(self, obj):
        return obj.distance.m

    class Meta:
        model = Food
        fields = "__all__"
        extra_kwargs = {"status": {"required": False}}


class FoodOwnSerializer(serializers.ModelSerializer):
    user = VKUserSerializer()

    class Meta:
        model = Food
        fields = "__all__"
        extra_kwargs = {"status": {"required": False}}

