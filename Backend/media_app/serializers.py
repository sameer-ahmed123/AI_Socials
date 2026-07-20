from media_app.models import PostMedia
from rest_framework import serializers


class MediaUploadSerializer(serializers.Serializer):
    file = serializers.ImageField()

    def validate_file(self, value):
        max_size = 5 * 1024 * 1024  # 5 MB

        if value.size > max_size:
            raise serializers.ValidationError(
                "Image size must not exceed 5 MB."
            )

        return value


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia

        fields = (
            "id",
            "image_url",
            "width",
            "height",
            "display_order",
        )
        read_only_fields = fields
