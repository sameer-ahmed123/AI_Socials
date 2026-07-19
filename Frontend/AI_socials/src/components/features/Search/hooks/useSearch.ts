import { useCallback, useState } from "react";
import {
  searchHashtags,
  searchPosts,
  searchUsers,
} from "../services/api/Search";
import type { Post } from "../../../../models/Post.model";
import type { SearchUser } from "../types/SearchUser.model";
import type { SearchHashtag } from "../types/SearchHashtag.model";

export type SearchScope = "posts" | "users" | "hashtags";

type SearchResult = Post[] | SearchUser[] | SearchHashtag[];

export const useSearch = () => {
  const [results, setResults] = useState<SearchResult>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<SearchScope>("posts");

  const search = useCallback(
    async (nextQuery: string, nextScope: SearchScope = scope) => {
      const trimmed = nextQuery.trim();
      if (!trimmed || trimmed.length < 2) {
        setResults([]);
        setError(null);
        return;
      }

      setQuery(trimmed);
      setScope(nextScope);

      setLoading(true);
      setError(null);

      try {
        switch (nextScope) {
          case "posts":
            setResults(await searchPosts(trimmed));
            break;
          case "users":
            setResults(await searchUsers(trimmed));
            break;
          case "hashtags":
            setResults(await searchHashtags(trimmed));
            break;
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Search failed.");
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [scope],
  );

  const clear = () => {
    setResults([]);
    setQuery("");
    setError(null);
  };

  return {
    results,
    loading,
    error,
    query,
    scope,
    search,
    clear,
  };
};
