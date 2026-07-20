from media_app.models import PostMedia
from users.firebase import get_current_user
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.response import Response

from media_app.serializers import MediaUploadSerializer, PostMediaSerializer
from media_app.services.storage import storage


@api_view(["POST"])
def upload_media(request):
    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    serializer = MediaUploadSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    uploaded = storage.upload(
        serializer.validated_data["file"]
    )
   
    return Response(
        uploaded,
        status=status.HTTP_201_CREATED,
    )
