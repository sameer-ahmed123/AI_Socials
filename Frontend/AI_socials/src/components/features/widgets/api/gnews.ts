const GNEWS_BASE_URL = "https://gnews.io/api/v4";

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const DEFAULT_NEWS_OPTIONS = {
  category: "general",
  language: "en",
  max: 10,
} as const;

export interface FetchTopHeadlinesOptions {
  category?: string;
  language?: string;
  max?: number;
}

export async function fetchTopHeadlines(
  options: FetchTopHeadlinesOptions = {},
) {
  const config = {
    ...DEFAULT_NEWS_OPTIONS,
    ...options,
  };

  const params = new URLSearchParams({
    category: config.category,
    lang: config.language,
    max: config.max.toString(),
    apikey: GNEWS_API_KEY,
  });
  const response = await fetch(
    `${GNEWS_BASE_URL}/top-headlines?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news.");
  }

  return response.json();
}
