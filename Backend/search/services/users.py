from django.db.models import Q
from users.models import User


def search_users(query: str):
    if not query:
        return User.objects.none()

    return (
        User.objects.filter(
            Q(username__icontains=query)
            | Q(display_name__icontains=query)
        )
        .order_by("username")
    )