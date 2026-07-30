import { useEffect, useState } from "react";
import { getTrendingHashtags } from "../api/trending";
import type { Trending } from "../models/Trend.model";

export const useTrending = () => {
  const [hashtags, setHashtags] = useState<Trending[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTrending = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTrendingHashtags();

      setHashtags(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Couldn't load trending hashtags.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTrending();
  }, []);

  return {
    hashtags,
    loading,
    error,
    refreshTrending,
  };
};
