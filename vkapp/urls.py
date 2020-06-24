from django.urls import path, include
from rest_framework import routers
from .views import VKUserViewSet, UserLoginView, UserCreateView, FoodViewSet

router = routers.SimpleRouter()
router.register(r'users', VKUserViewSet)
router.register(r'food', FoodViewSet)
urlpatterns = router.urls

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', UserLoginView.as_view()),
    path('auth/create/', UserCreateView.as_view()),
]