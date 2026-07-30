from django.urls import path

from posts.views import *


urlpatterns = [
    path(
        "",
        posts,
        name="posts",
    ),
    path(
        "feed/",
        feed,
        name="feed",
    ),
    path(
        "<int:post_id>/like/",
        toggle_like,
        name="toggle_like",
    ),
    path(
        "<int:post_id>/",
        post_detail,
        name="post_detail",
    ),
    path(
        "<int:post_id>/bookmark/",
        toggle_bookmark,
        name="toggle_bookmark",
    ),
    path(
        "<int:post_id>/repost/",
        toggle_repost,
        name="toggle_repost",
    ),
    path(
        "hashtag/<str:hashtag_name>/",
        hashtag_posts,
        name="hashtag_post"
    ),
    path(
        "trending/",
        trending_hashtags,
        name="trending_hashtags",
    ),
]
