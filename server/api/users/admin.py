from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import ExtendedUser


class ExtendedUserInline(admin.StackedInline):
    model = ExtendedUser
    can_delete = False
    verbose_name_plural = 'ExtendedUser'


class UserAdmin(BaseUserAdmin):
    inlines = (ExtendedUserInline,)
    list_display = (
        'username',
        'email',
        'first_name',
        'last_name',
        'is_staff',
        'get_groups'
    )

    def get_groups(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])
    get_groups.short_description = 'Groups'


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
