class FeedRanker:
    """
    Responsible for ordering feed items.

    Currently:
        • Chronological order

    Future:
        • Engagement score
        • AI ranking
        • Freshness boost
        • Diversity
        • Personalisation
    """
    

    def rank(self, queryset):
        """
        Return the ranked queryset.

        For MVP we simply preserve chronological ordering.
        """

        return queryset
