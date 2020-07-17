import os
import random
import string
from base64 import b64encode
from collections import OrderedDict
from hashlib import sha256
from hmac import HMAC
from urllib.parse import urlparse, parse_qsl, urlencode
from hashlib import md5
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from .utils import VKUtils

class VKUserManager(BaseUserManager, VKUtils):
    """
    Custom user model manager where username (vk_id) and query_params from Vk
    for authentication instead of usernames.
    """

    def create_user(self, query_params=None, **extra_fields):
        """
        Create and save a User with the given query_params.
        """
        query_params = self.parse_vk_signature(query_params)
        signature_valid = self.validate_vk_signature(query=query_params, secret=settings.VK_SECRET_KEY)
        vk_user_id = query_params.get("vk_user_id")
        
        # if settings.USE_HASH_AS_USERNAME: 
        #     username = md5(vk_user_id.encode(encoding='utf-8')).hexdigest()
        # else: 
        if not query_params:
            raise ValueError(_("Queryparams must be set"))
        
        if signature_valid is not True:
            raise ValueError(_("The signature is not valid"))

        password = self.create_password(settings.DEFAULT_USER_PASSWORD_LENGTH)
        user = self.model(username=vk_user_id, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, vk_id, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        user = self.model(vk_id=vk_id, **extra_fields)
        user.set_password(password)
        user.save()
        return user