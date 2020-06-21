from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import VKUser, Food


class VKUserSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = VKUser
        geo_field = "location_coordinates"
        fields = "__all__"
        extra_kwargs = {"location_title": {"required": False}}


class FoodSerializer(serializers.ModelSerializer):
    user = VKUserSerializer()
    distance = serializers.SerializerMethodField()

    def get_distance(self, obj):
        return obj.distance.m

    class Meta:
        model = Food
        fields = "__all__"
        extra_kwargs = {"status": {"required": False}}

