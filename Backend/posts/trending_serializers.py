from rest_framework import serializers
from posts.models import Hashtag


class TrendingHashtagSerializer(serializers.ModelSerializer):
    post_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Hashtag
        fields = (
            "name",
            "post_count",
        )