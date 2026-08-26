from __future__ import annotations

import json
import threading
import time

from collections import deque
from datetime import datetime, timezone
from pathlib import Path


class LLMRateLimitExceeded(RuntimeError):
    """
    Raised when the daily request limit has been exhausted.

    The minute limit is handled by waiting automatically because it
    is temporary. The daily limit cannot be solved by waiting a
    short amount of time, so it raises explicitly.
    """


class LLMRateLimiter:
    """
    Provider-agnostic request limiter for LLM clients.

    Enforces:

        - max_requests_per_minute
        - max_requests_per_day

    The minute limit is a rolling window.

    The daily limit is based on UTC calendar days.

    State is persisted to disk so creating a new LLM client does not
    reset the counters.
    """

    _lock = threading.Lock()

    def __init__(
        self,
        *,
        max_requests_per_minute: int = 5,
        max_requests_per_day: int = 50,
        state_file: str | Path | None = None,
    ) -> None:

        if max_requests_per_minute <= 0:
            raise ValueError(
                "max_requests_per_minute must be greater than zero."
            )

        if max_requests_per_day <= 0:
            raise ValueError(
                "max_requests_per_day must be greater than zero."
            )

        self.max_requests_per_minute = max_requests_per_minute
        self.max_requests_per_day = max_requests_per_day

        if state_file is None:
            state_file = (
                Path.cwd()
                / ".sketchx"
                / "llm_rate_limit.json"
            )

        self.state_file = Path(state_file)
        self.state_file.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

    # --------------------------------------------------------------
    # PUBLIC API
    # --------------------------------------------------------------

    def acquire(self) -> None:
        """
        Wait until one LLM request is permitted.

        Raises:
            LLMRateLimitExceeded:
                If the daily limit has been exhausted.
        """

        while True:
            with self._lock:
                state = self._load_state()

                now = time.time()
                today = self._today()

                self._reset_day_if_needed(
                    state=state,
                    today=today,
                )

                self._prune_minute_requests(
                    state=state,
                    now=now,
                )

                daily_count = len(
                    state["daily_requests"]
                )

                if daily_count >= self.max_requests_per_day:
                    raise LLMRateLimitExceeded(
                        "LLM daily request limit exhausted. "
                        f"Limit: {self.max_requests_per_day} "
                        f"requests/day."
                    )

                minute_requests = state[
                    "minute_requests"
                ]

                if (
                    len(minute_requests)
                    < self.max_requests_per_minute
                ):
                    self._record_request(
                        state=state,
                        now=now,
                    )
                    self._save_state(state)
                    return

                oldest_request = minute_requests[0]

                wait_seconds = max(
                    0.0,
                    60.0 - (now - oldest_request),
                )

            time.sleep(wait_seconds)

    # --------------------------------------------------------------
    # STATE
    # --------------------------------------------------------------

    def _load_state(self) -> dict:
        if not self.state_file.exists():
            return self._empty_state()

        try:
            with self.state_file.open(
                "r",
                encoding="utf-8",
            ) as file:
                state = json.load(file)

        except (
            OSError,
            ValueError,
            json.JSONDecodeError,
        ):
            return self._empty_state()

        return {
            "date": state.get(
                "date",
                self._today(),
            ),
            "daily_requests": list(
                state.get(
                    "daily_requests",
                    [],
                )
            ),
            "minute_requests": list(
                state.get(
                    "minute_requests",
                    [],
                )
            ),
        }

    def _save_state(
        self,
        state: dict,
    ) -> None:

        temporary_file = self.state_file.with_suffix(
            ".tmp"
        )

        with temporary_file.open(
            "w",
            encoding="utf-8",
        ) as file:
            json.dump(
                state,
                file,
                indent=2,
            )

        temporary_file.replace(
            self.state_file
        )

    @staticmethod
    def _empty_state() -> dict:
        return {
            "date": LLMRateLimiter._today(),
            "daily_requests": [],
            "minute_requests": [],
        }

    # --------------------------------------------------------------
    # REQUEST BOOKKEEPING
    # --------------------------------------------------------------

    def _record_request(
        self,
        *,
        state: dict,
        now: float,
    ) -> None:

        state["daily_requests"].append(now)
        state["minute_requests"].append(now)

    @staticmethod
    def _prune_minute_requests(
        *,
        state: dict,
        now: float,
    ) -> None:

        cutoff = now - 60.0

        state["minute_requests"] = [
            timestamp
            for timestamp in state["minute_requests"]
            if timestamp > cutoff
        ]

    @staticmethod
    def _reset_day_if_needed(
        *,
        state: dict,
        today: str,
    ) -> None:

        if state.get("date") == today:
            return

        state["date"] = today
        state["daily_requests"] = []
        state["minute_requests"] = []

    @staticmethod
    def _today() -> str:
        return datetime.now(
            timezone.utc
        ).date().isoformat()