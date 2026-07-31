from django.urls import path
from users.views import *

urlpatterns = [
    path(
        "me/",
        update_profile,
        name="update_profile",
    ),
    path(
        "discover/",
        discover_people,
        name="discover_people",
    ),
    path(
        "<str:username>/",
        profile,
        name="profile",
    ),

    path(
        "<str:username>/posts/",
        profile_posts,
        name="profile_posts",
    ),

]
