from django.urls import path

from . import views

urlpatterns = [
    path(
        "me/",
        views.update_profile,
        name="update_profile",
    ),

    path(
        "<str:username>/",
        views.profile,
        name="profile",
    ),

    path(
        "<str:username>/posts/",
        views.profile_posts,
        name="profile_posts",
    ),

    # path(
    #     "<str:username>/replies/",
    #     views.profile_replies,
    #     name="profile_replies",
    # ),

]
