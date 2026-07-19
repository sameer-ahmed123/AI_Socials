import { Link } from "react-router-dom";

import Avatar from "../../../../ui/Avatar/Avatar";
import Card from "../../../../ui/card/Card";

import type { UserSearchCardProps } from "./UserSearchCard.types";

import "./UserSearchCard.css";

const UserSearchCard = ({ user }: UserSearchCardProps) => {
  return (
    <Link to={`/profile/${user.username}`} className="user-search-card__link">
      <Card className="user-search-card">
        <Avatar image={user.avatar} alt={user.display_name} />

        <div className="user-search-card__content">
          <h4>{user.display_name}</h4>

          <span>@{user.username}</span>
          {user.bio && <p>{user.bio}</p>}
        </div>
      </Card>
    </Link>
  );
};

export default UserSearchCard;
