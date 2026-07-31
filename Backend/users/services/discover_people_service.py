from django.contrib.auth import get_user_model
from django.db.models import Count

from follows.models import Follow

User = get_user_model()


def get_discover_people(
    current_user,
    limit: int = 5,
):
    """
    Return users worth discovering.

    Current strategy:
    - exclude yourself
    - exclude people you already follow
    - rank by follower count
    - newest users break ties
    """

    following_ids = Follow.objects.filter(
        follower=current_user,
    ).values_list(
        "following_id",
        flat=True,
    )

    users = (
        User.objects.exclude(
            id=current_user.id,
        )
        .exclude(
            id__in=following_ids,
        )
        .annotate(
            follower_count=Count(
                "follower_relationships",
                distinct=True,
            )
        )
        .order_by(
            "-follower_count",
            "-date_joined",
        )[:limit]
    )

    return users