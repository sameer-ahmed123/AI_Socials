from django.urls import path

from . import views

urlpatterns = [
    # path(
    #     "<str:username>/",
    #     views.profile,
    #     name="profile",
    # ),

    # path(
    #     "<str:username>/followers/",
    #     views.followers,
    #     name="followers",
    # ),

    # path(
    #     "<str:username>/following/",
    #     views.following,
    #     name="following",
    # ),

    path(
        "me/",
        views.update_profile,
        name="update_profile",
    ),
]
