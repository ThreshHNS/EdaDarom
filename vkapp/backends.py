

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.conf import settings
from .utils import VKUtils

User = get_user_model()


class VKBackend(BaseBackend, VKUtils):
    def authenticate(self, request, query_params=None, *args, **kwargs):
        query_params = self.parse_vk_signature(query_params)
        vk_user_id = query_params.get("vk_user_id")
        if not vk_user_id:
            return None  # for admin auth
        signature_valid = self.validate_vk_signature(
            query=query_params, secret=settings.VK_SECRET_KEY
        )
        if signature_valid:
            try:
                user = User.objects.get(username=vk_user_id)
            except User.DoesNotExist:
                return None
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
