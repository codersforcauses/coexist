from django.contrib import admin

from .models import Branch
from api.soft_delete import SoftDeleteAdmin


@admin.register(Branch)
class BranchAdmin(SoftDeleteAdmin):
    pass


# Register your models here.
