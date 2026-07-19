from django.db.models import Q

from posts.models import Post


def search_posts(query: str):
    if not query:
        return Post.objects.none()

    return (
        Post.objects.filter(
            Q(content__icontains=query)
        )
        .select_related("author")
        .order_by("-created_at")
    )
