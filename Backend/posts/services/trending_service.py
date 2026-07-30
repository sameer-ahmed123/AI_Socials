from django.db.models import Count
from posts.models import Hashtag


def get_trending_hashtags(limit: int = 5):
    """
    Return the most frequently used hashtags.
    """

    return (
        Hashtag.objects
        .annotate(
            post_count=Count("posts"),
        )
        .filter(post_count__gt=0)
        .order_by(
            "-post_count",
            "name",
        )[:limit]
    )