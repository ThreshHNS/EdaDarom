from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import VKUser


class VKUserSerializer(GeoFeatureModelSerializer):

    class Meta:
        model = VKUser
        geo_field = 'location_coordinates'
        fields = '__all__'
        extra_kwargs = {'location_title': {'required': False} }

    