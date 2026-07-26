import "./FollowButton.css";

interface FollowButtonProps {
  isFollowing: boolean;
  loading: boolean;
  onClick: () => void;
}

export default function FollowButton({
  isFollowing,
  loading,
  onClick,
}: FollowButtonProps) {
  return (
    <button
      className={`follow-button ${isFollowing ? "following" : ""}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}
