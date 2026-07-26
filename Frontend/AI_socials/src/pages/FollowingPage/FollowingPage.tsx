import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFollowing } from "../../components/features/Profile/services/api/follow";
import UserSearchCard from "../../components/features/Search/components/UserSearchCard/UserSearchCard";

import type { SearchUser } from "../../components/features/Search/types/SearchUser.model";

import "./FollowingPage.css";
import EmptyState from "../../components/ui/EmptyState";
import { CircleUser } from "lucide-react";
import LoadingScreen from "../../components/common/loadingScreen/LoadingScreen";

export default function FollowingPage() {
  const { user_id } = useParams();
  const id = Number(user_id);

  const [following, setFollowing] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user_id) return;

    async function loadFollowing() {
      try {
        const data = await getFollowing(id);
        setFollowing(data);
      } finally {
        setLoading(false);
      }
    }

    loadFollowing();
  }, [user_id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (following.length === 0) {
    return (
      <EmptyState
        icon={<CircleUser size={48} />}
        title="Not Following Anyone Yet"
        description="People you follow will show up here "
      />
    );
  }

  return (
    <section className="following-page">
      <h2>Following</h2>

      {following.map((user) => (
        <UserSearchCard key={user.id} user={user} />
      ))}
    </section>
  );
}
