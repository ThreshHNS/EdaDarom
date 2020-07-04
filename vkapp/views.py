from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.db.models.functions import GeometryDistance
from rest_framework import status, viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from knox.models import AuthToken
from .models import VKUser, Food
from .serializers import (
    VKUserSerializer,
    UserLoginSerializer,
    UserCreateSerializer,
    FoodSerializer,
    FoodNearestSerializer,
    FoodOwnSerializer
)


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user":
            VKUserSerializer(user, context=self.get_serializer_context()).data,
            "token":
            AuthToken.objects.create(user)[1]
        })


class UserCreateView(generics.GenericAPIView):
    serializer_class = UserCreateSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(status=status.HTTP_201_CREATED)


# TODO: Change to genericapiview to Register
class VKUserViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    """
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = VKUser.objects.all()
    serializer_class = VKUserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return self.get_object()

    def list(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class FoodViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    """

    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    parser_class = (FileUploadParser, )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False)
    def nearest(self, request):
        user = request.user
        radius = user.notifications_radius * 10000000
        ref_location = user.location_coordinates
        queryset = (
            Food.objects
            .annotate(distance=Distance("user__location_coordinates", ref_location))
            .filter(distance__lte=radius, status="Active")
            .exclude(user=user)
            .order_by("distance")
        )
        serializer = FoodNearestSerializer(
            queryset, context={"request": request}, many=True
        )
        return Response(serializer.data)

    @action(detail=False)
    def own(self, request):
        user = request.user
        queryset = (
            Food.objects
            .filter(user=user, status="Active")
            .order_by("end_date")
        )
        serializer = FoodOwnSerializer(
            queryset, context={"request": request}, many=True
        )
        return Response(serializer.data)
