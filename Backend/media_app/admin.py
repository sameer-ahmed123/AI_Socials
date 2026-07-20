from django.contrib import admin

from media_app.models import PostMedia


@admin.register(PostMedia)
class PostMediaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "post",
        "display_order",
        "created_at",
    )

    list_filter = (
        "created_at",
    )

    search_fields = (
        "post__id",
        "public_id",
    )