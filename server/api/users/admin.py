from django.contrib import admin
from .models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth.admin import UserAdmin


@admin.register(User)
class UserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ("email", "is_staff", "is_active",)
    list_filter = ("email", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": (
            "is_staff",
            "is_active",
            "groups",
            "user_permissions"
        )}),
    )
    add_fieldsets = ((
            None, {
                "classes": ("wide",),
                "fields": (
                    "email", "password1", "password2", "is_staff",
                    "is_active", "groups", "user_permissions"
                )
            }
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
