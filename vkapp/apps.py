from django.apps import AppConfig


class VKUserConfig(AppConfig):
    name = 'vkapp'

    def ready(self):
        import vkapp.signals