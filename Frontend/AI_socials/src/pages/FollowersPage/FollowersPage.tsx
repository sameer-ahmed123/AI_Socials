import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFollowers } from "../../components/features/Profile/services/api/follow";
import UserSearchCard from "../../components/features/Search/components/UserSearchCard/UserSearchCard";

import type { SearchUser } from "../../components/features/Search/types/SearchUser.model";

import "./FollowersPage.css";
import { CircleUser } from "lucide-react";
import EmptyState from "../../components/ui/EmptyState";
import LoadingScreen from "../../components/common/loadingScreen/LoadingScreen";

export default function FollowersPage() {
  const { user_id } = useParams();
  const id = Number(user_id);
  const [followers, setFollowers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user_id) return;

    async function loadFollowers() {
      try {
        const data = await getFollowers(id);
        setFollowers(data);
      } finally {
        setLoading(false);
      }
    }

    loadFollowers();
  }, [user_id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (followers.length === 0) {
    return (
      <EmptyState
        icon={<CircleUser size={48} />}
        title="No Followers Yet"
        description="People who follow you will show up here "
      />
    );
  }

  return (
    <section className="followers-page">
      <h2>Follwers</h2>
      {followers.map((user) => (
        <UserSearchCard key={user.id} user={user} />
      ))}
    </section>
  );
}
