from django.db.models import F, Count, IntegerField, QuerySet, ExpressionWrapper
from posts.models import Post


class PopularityService:
    """
    Computes popularity scores for posts.

    Current MVP formula:

        score =
            likes
            + comments * 2
            + reposts * 3

    Later on :
        Choose somethig simmilar 
        + Time decay
        + interactivity score
    """

    COMMENT_WEIGHT = 2
    REPOST_WEIGHT = 3

    @classmethod
    def ranked_posts(cls) -> QuerySet[Post]:
        posts = (
            Post.objects
            .select_related("author")
            .prefetch_related("media", "hashtags")
            .annotate(
                likes_count=Count("likes", distinct=True),
                comments_count=Count("comments", distinct=True),
                reposts_count=Count("reposts", distinct=True),
            )
        )

        popularity_score = ExpressionWrapper(
            F("likes_count")
            + F("comments_count") * cls.COMMENT_WEIGHT
            + F("reposts_count") * cls.REPOST_WEIGHT,
            output_field=IntegerField(),
        )

        return (
            posts
            .annotate(popularity_score=popularity_score)
            .order_by("-popularity_score", "-created_at")[:3]
            
        )
