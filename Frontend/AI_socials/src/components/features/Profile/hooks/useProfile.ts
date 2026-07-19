import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../../../../hooks/useAuth";

import type { Profile } from "../types";

import { getProfile as getProfileRequest } from "../services/api/profile";

export const useProfile = (username?: string) => {
  
  const { initializing } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const response = await getProfileRequest(username);
      setProfile(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load profile.");
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (initializing) return;
    refresh();
  }, [initializing, refresh]);

  return {
    profile,
    loading,
    error,
    refresh,
  };
};