from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import VKUser
from .serializers import VKUserSerializer


class VKUserViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    """
    queryset = VKUser.objects.all()
    serializer_class = VKUserSerializer
