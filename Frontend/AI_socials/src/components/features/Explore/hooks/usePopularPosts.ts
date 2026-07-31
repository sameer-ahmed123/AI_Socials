import { useEffect, useState } from "react";
import { getPopularPosts } from "../api/popular";
import type { Post } from "../../../../models/Post.model";

export function usePopularPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPopularPosts();
        setPosts(data);
      } catch {
        setError("Failed to load popular posts.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    posts,
    loading,
    error,
  };
}
