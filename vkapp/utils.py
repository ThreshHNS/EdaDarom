from datetime import datetime
from uuid import uuid4
import os


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
    upload_to = 'image'
    time = datetime.now().strftime('%d-%m-%y %H:%M:%S')
    ext = filename.split('.')[-1]
    if instance.pk:
        filename = f'user_{instance.user.pk}_{instance.pk}_{time}.{ext}'
    else:
        filename = f'{uuid4().hex}.{ext}'
    return os.path.join(upload_to, filename)