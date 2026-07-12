from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "id",
        "username",
        "email",
        "display_name",
        "is_verified",
        "is_private",
        "is_staff",
    )

    search_fields = (
        "username",
        "email",
        "display_name",
    )

    list_filter = (
        "is_verified",
        "is_private",
        "is_staff",
        "is_active",
    )