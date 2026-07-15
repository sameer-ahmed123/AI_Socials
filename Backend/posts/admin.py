from django.contrib import admin

from .models import Post, Like, Bookmark


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "created_at",
    )

    search_fields = (
        "content",
        "author__username",
    )

    list_filter = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )


admin.site.register(Like)
admin.site.register(Bookmark)
