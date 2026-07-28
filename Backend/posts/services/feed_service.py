from django.db.models import Q

from posts.models import Post


class FeedService:
    """
    Responsible for constructing a user's feed.

    Supported:
        - Following feed
        - For You feed (temporary latest-posts implementation)

    Future:
        - Ranking
        - Recommendations
        - Muted users
        - Blocked users
        - Cursor pagination
    """

    def __init__(self, user):
        self.user = user

    def get_feed(self, mode: str):
        """
        Entry point for all feed requests.
        """

        if mode == "following":
            return self.get_following_feed()

        if mode == "for-you":
            return self.get_for_you_feed()

        raise ValueError("Invalid feed mode.")

    def get_following_feed(self):
        """
        Posts from:
            - the authenticated user
            - everyone they follow

        Ordered newest first.
        """

        return (
            Post.objects.filter(
                Q(author=self.user)
                | Q(author__follower_relationships__follower=self.user)
            )
            .select_related("author")
            .prefetch_related("media")
            .distinct()
            .order_by("-created_at")
        )

    def get_for_you_feed(self):
        """
        Temporary implementation.

        Currently returns the global timeline ordered newest first.

        Future implementation will include:
            - ranking
            - recommendations
            - engagement scoring
            - trending
        """

        return (
            Post.objects.select_related("author")
            .prefetch_related("media")
            .order_by("-created_at")
        )