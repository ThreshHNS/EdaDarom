from rest_framework import routers
from .views import VKUserViewSet, FoodViewSet

router = routers.SimpleRouter()
router.register(r'users', VKUserViewSet)
router.register(r'food', FoodViewSet)
urlpatterns = router.urls