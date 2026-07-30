from typing import Iterable
from posts.models import Hashtag


def get_or_create_hashtags(
    names: Iterable[str],
) -> list[Hashtag]:
    """
    Return Hashtag objects for the supplied names.

    Existing hashtags are reused.
    Missing hashtags are created.
    """

    hashtags: list[Hashtag] = []

    for name in names:
        hashtag, _ = Hashtag.objects.get_or_create(
            name=name,
        )

        hashtags.append(hashtag)
    print(hashtags)

    return hashtags