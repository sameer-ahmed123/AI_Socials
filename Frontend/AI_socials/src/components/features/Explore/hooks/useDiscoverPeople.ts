import { useEffect, useState } from "react";
import { getDiscoverPeople } from "../api/discover_people";
import type { SearchUser } from "../../Search/types/SearchUser.model";
import { useAuth } from "../../../../hooks/useAuth";

export function useDiscoverPeople() {
  const { initializing, user } = useAuth();
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initializing || !user) {
      return;
    }
    async function load() {
      try {
        const data = await getDiscoverPeople();
        console.log("discover people");
        console.log(data);
        setUsers(data);
      } catch {
        setError("Failed to load suggested people.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [initializing, user]);

  return {
    users,
    loading,
    error,
  };
}
