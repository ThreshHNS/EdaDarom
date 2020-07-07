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


def path_and_rename_image(instance, filename):
    """Переименовать файл в ImageField модели Food
    Изменить название и путь файла, если существует аналогичный
    с таким же названием.
    Args:
        instance (Food Model): Instance of Food model
        filename (string): Название файла (картинки)
    Returns:
        os.path.join('image', filename)
    """
    time = datetime.now().strftime("%d-%m-%y %H:%M:%S")
    ext = filename.split(".")[-1]
    upload_to = f"image/{instance.user.pk}"
    filename = f'image_"{instance.uuid}"_{time}.{ext}'
    return os.path.join(upload_to, filename)


def path_and_rename_preview(instance, filename):
    """Переименовать файл preview в ImageField модели Food
    Изменить название и путь файла, если существует аналогичный
    с таким же названием.
    Args:
        instance (Food Model): Instance of Food model
        filename (string): Название файла (картинки) предосмотра
    Returns:
        os.path.join('image', filename)
    """
    time = datetime.now().strftime("%d-%m-%y %H:%M:%S")
    ext = filename.split(".")[-1]
    upload_to = f"image/{instance.user.pk}"
    filename = f'preview_"{instance.uuid}"_{time}.{ext}'
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

