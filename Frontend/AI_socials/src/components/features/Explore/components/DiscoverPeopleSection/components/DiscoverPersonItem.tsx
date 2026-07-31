import { Link } from "react-router-dom";
import Avatar from "../../../../../../components/ui/Avatar/Avatar";
import type { SearchUser } from "../../../../../../components/features/Search/types/SearchUser.model";

import "./DiscoverPersonItem.css";

interface DiscoverPersonItemProps {
  user: SearchUser;
  onFollow?: (userId: string | number) => void;
}

const DiscoverPersonItem = ({ user, onFollow }: DiscoverPersonItemProps) => {
  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigating to profile when clicking Follow
    if (onFollow) {
      onFollow(user.id);
    }
  };

  return (
    <div className="discover-person-item-card">
      <Link to={`/profile/${user.username}`} className="discover-person-item__link">
        <Avatar image={user.avatar} alt={user.username} size="md" />

        <div className="discover-person-item__info">
          <h4 className="discover-person-item__name">{user.display_name}</h4>
          <span className="discover-person-item__username">@{user.username}</span>
        </div>
      </Link>

      <button className="discover-person-item__follow-btn" onClick={handleFollowClick}>
        Follow
      </button>
    </div>
  );
};

export default DiscoverPersonItem;