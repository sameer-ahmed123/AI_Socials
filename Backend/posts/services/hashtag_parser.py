"""
this service file should be used to help in hashtag extraction from posts content text
and return a list of hashtags 

it recives text => Hashtag_parser(text) => list[hashtag1,hashtag2,hashtag3]

-the hashtags should be in lowercase . parser should auto convert hashtags to lowercase so no case difference arises
- (#Hashtag != #hashtag) 

- should remove duplicates  (#react #react #html ) => #react #html
"""
import re


HASHTAG_PATTERN = re.compile(r"#([A-Za-z0-9_]+)")


def extract_hashtags(content: str) -> list[str]:

    hashtags = HASHTAG_PATTERN.findall(content)

    return list(
        dict.fromkeys(
            tag.lower()
            for tag in hashtags
        )
    )