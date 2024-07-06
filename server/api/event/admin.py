from django.contrib import admin  # noqa

from .models import Event
from api.soft_delete import SoftDeleteAdmin

# Register your models here.


@admin.register(Event)
class BranchAdmin(SoftDeleteAdmin):
    pass
