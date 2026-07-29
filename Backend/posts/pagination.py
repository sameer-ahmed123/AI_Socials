from rest_framework.pagination import CursorPagination


class FeedPagination(CursorPagination):
    page_size = 3

    ordering = "-created_at"

    page_size_query_param = None
