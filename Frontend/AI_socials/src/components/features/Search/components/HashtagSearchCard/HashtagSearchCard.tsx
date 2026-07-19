import Card from "../../../../ui/card/Card";

import type { HashtagSearchCardProps } from "./HashtagSearchCard.types";

import "./HashtagSearchCard.css";

const HashtagSearchCard = ({ hashtag }: HashtagSearchCardProps) => {
  return (
    <Card className="hashtag-search-card">
      <div className="hashtag-search-card__content">
        <h4>#{hashtag.tag}</h4>

        <span>{hashtag.count} Posts</span>
      </div>
    </Card>
  );
};

export default HashtagSearchCard;
