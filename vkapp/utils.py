from datetime import datetime
from uuid import uuid4
import os
import random
import string
from base64 import b64encode
from collections import OrderedDict
from hashlib import sha256
from hmac import HMAC
from urllib.parse import urlparse, parse_qsl, urlencode
from hashlib import md5


def path_and_rename(instance, filename):
    """Переименовать файл в ImageField модели Food
    Изменить название и путь файла, если существует аналогичный
    с таким же названием.
    Args:
        instance (Food Model): Instance of Food model
        filename (string): Название файла (картинки)
    Returns:
        os.path.join('image', filename)
    """
    upload_to = "image"
    time = datetime.now().strftime("%d-%m-%y %H:%M:%S")
    ext = filename.split(".")[-1]
    if instance.pk:
        filename = f"user_{instance.user.pk}_{instance.pk}_{time}.{ext}"
    else:
        filename = f"{uuid4().hex}.{ext}"
    return os.path.join(upload_to, filename)


class VKUtils:
    """
    Custom user model manager where username (vk_id) and query_params from Vk
    for authentication instead of usernames.
    """

    @staticmethod
    def parse_vk_signature(url):
        return dict(parse_qsl(urlparse(url).query, keep_blank_values=True))

    @staticmethod
    def validate_vk_signature(query, secret):
        vk_subset = OrderedDict(sorted(x for x in query.items() if x[0][:3] == "vk_"))
        hash_code = b64encode(
            HMAC(
                secret.encode(), urlencode(vk_subset, doseq=True).encode(), sha256
            ).digest()
        )
        decoded_hash_code = (
            hash_code.decode("utf-8")[:-1].replace("+", "-").replace("/", "_")
        )
        return query.get("sign") == decoded_hash_code

    @staticmethod
    def create_password(length=16):
        chars = string.ascii_letters + string.digits + "!@#$%^&*"
        random.seed = os.urandom(1024)
        return "".join(random.choice(chars) for i in range(length))

