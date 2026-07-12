from django.urls import path

from . import views

urlpatterns = [
    path(
        "login/",
        views.firebase_login,
        name="firebase_login",
    ),

    path(
        "me/",
        views.current_user,
        name="current_user",
    ),
]
