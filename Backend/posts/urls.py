from django.urls import path

from . import views


urlpatterns = [
    path(
        "",
        views.posts,
        name="posts",
    ),
    path(
        "<int:post_id>/like/",
        views.toggle_like,
        name="toggle_like",
    ),
    path(
        "<int:post_id>/",
        views.post_detail,
        name="post_detail",
    ),
    path(
        "<int:post_id>/bookmark/",
        views.toggle_bookmark,
        name="toggle_bookmark",
    ),
    path(
        "<int:post_id>/repost/",
        views.toggle_repost,
        name="toggle_repost",
    ),
]
