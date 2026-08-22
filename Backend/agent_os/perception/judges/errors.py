from __future__ import annotations


class RelevanceJudgeError(Exception):
    """
    Base exception for relevance-judge failures.
    """


class RelevanceJudgeResponseError(RelevanceJudgeError):
    """
    The LLM returned a response that could not be used.
    """


class RelevanceJudgeResponseMismatch(RelevanceJudgeResponseError):
    """
    The LLM response does not correspond exactly to the
    requested perception items.
    """