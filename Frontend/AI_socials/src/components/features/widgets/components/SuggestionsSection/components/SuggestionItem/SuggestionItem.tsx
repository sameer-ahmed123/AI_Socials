import Avatar from "../../../../../../ui/Avatar/Avatar";
import Button from "../../../../../../ui/Button/Button";

import type { SuggestionItemProps } from "./SuggestionItem.types";

import "./SuggestionItem.css";

const SuggestionItem = ({ color, user, onFollow }: SuggestionItemProps) => {
  const handleFollow = () => {
    onFollow?.(user.id);
  };

  return (
    <article className="suggestion-item">
      <div className="suggestion-item__user">
        <Avatar color={color} initials={user.name.charAt(0)} />

        <div className="suggestion-item__info">
          <h4 className="suggestion-item__name">{user.name}</h4>

          <p className="suggestion-item__username">{user.username}</p>
        </div>
      </div>

      <Button size="sm" onClick={handleFollow}>
        Follow
      </Button>
    </article>
  );
};

export default SuggestionItem;
