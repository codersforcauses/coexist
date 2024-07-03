from django.apps import AppConfig


class Config(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api.user"

    def ready(self):
        from . import signals # noqa F401
