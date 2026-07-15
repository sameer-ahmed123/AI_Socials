from django.urls import path
from comments.views import comments, comment_detail


urlpatterns = [

    path(
        "posts/<int:post_id>/comments/",
        comments,
        name="comments",
    ),

    path(
        "comments/<int:comment_id>/",
        comment_detail,
        name="comment_detail",
    ),
]
