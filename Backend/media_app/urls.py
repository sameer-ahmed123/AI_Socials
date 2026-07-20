from django.urls import path

from media_app.views import upload_media

urlpatterns = [
    path(
        "upload/",
        upload_media,
        name="media-upload",
    ),
]
