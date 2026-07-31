import { Link } from "react-router-dom";
import "./TrendingHashtagItem.css";
import type { TrendingHashtagItemProps } from "./TrendingHashtagItem.types";

const TrendingHashtagItem = ({ hashtag }: TrendingHashtagItemProps) => {
  return (
    <Link to={`/hashtag/${hashtag.name}`} className="trending-hashtag-item">
      <h3 className="trending-hashtag-item__name">#{hashtag.name}</h3>
      <p className="trending-hashtag-item__count">{hashtag.post_count} posts</p>
    </Link>
  );
};

export default TrendingHashtagItem;
