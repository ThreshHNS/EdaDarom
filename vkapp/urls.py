from rest_framework import routers
from .views import VKUserViewSet

router = routers.SimpleRouter()
router.register(r'users', VKUserViewSet)
urlpatterns = router.urls