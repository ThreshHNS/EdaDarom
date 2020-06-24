from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.db.models.functions import GeometryDistance
from rest_framework import status, viewsets, generics
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from knox.models import AuthToken
from .models import VKUser, Food
from .serializers import (
    VKUserSerializer,
    UserLoginSerializer,
    UserCreateSerializer,
    FoodSerializer,
    FoodNearestSerializer,
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

    queryset = VKUser.objects.all()
    serializer_class = VKUserSerializer

    def retrieve(self, request, pk=None):
        serializer = VKUserSerializer(queryset)
        return Response(serializer.data)


class FoodViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    """

    queryset = Food.objects.all()
    serializer_class = FoodSerializer

    @action(detail=False)
    def nearest(self, request):
        vk_id = self.request.query_params.get("vk_id")
        user = VKUser.objects.filter(vk_id=vk_id).first()
        if user is not None:
            radius = user.notifications_radius * 10000000
            ref_location = user.location_coordinates
            queryset = (
                Food.objects.annotate(
                    distance=Distance("user__location_coordinates", ref_location)
                )
                .filter(distance__lte=radius)
                .exclude(user__vk_id=vk_id)
                .order_by("distance")
            )
            serializer = FoodNearestSerializer(
                queryset, context={"request": request}, many=True
            )
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=False)
    def own(self, request):
        print(request.user)
        vk_id = self.request.query_params.get("vk_id")
        user = VKUser.objects.filter(vk_id=vk_id).first()
        if user is not None:
            queryset = Food.objects.filter(user__vk_id=vk_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
