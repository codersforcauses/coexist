from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api.users"

    def ready(self):
        from . import signals # noqa F401
