import { useCallback, useEffect, useState } from "react";

import { getNews } from "../services/news";

import type { NewsArticle } from "../types/NewsArticle";

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const news = await getNews({max:3});

      setArticles(news);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch news.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshNews();
  }, [refreshNews]);

  return {
    articles,
    loading,
    error,
    refreshNews,
  };
}
