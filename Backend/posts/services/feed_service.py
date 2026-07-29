from posts.services.feed_ranker import FeedRanker
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
        self.ranker = FeedRanker()

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

        query_set = (
            # following_feed should return only the posts made by people you are following
            Post.objects.filter(
                Q(author__follower_relationships__follower=self.user)
            )
            .select_related("author")
            .prefetch_related("media")
            .distinct()
            .order_by("-created_at")
        )
        return self.ranker.rank(query_set)

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

        query_set = (
            Post.objects.select_related("author")
            .prefetch_related("media")
            .order_by("-created_at")
        )

        return self.ranker.rank(query_set)
