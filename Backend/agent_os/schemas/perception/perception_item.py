from __future__ import annotations
from typing import Any
from pydantic import BaseModel


class PerceptionItem(BaseModel):
    """
    A normalized item from the objective WorldContext.

    A PerceptionItem represents something that an agent could potentially
    notice. It does not contain any judgment about whether the item is
    relevant.
    """

    id: str
    category: str
    content: Any