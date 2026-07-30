import type { TrendItemProps } from "./TrendItem.types";

import "./TrendItem.css";
import { Link } from "react-router-dom";

const TrendItem = ({ trend }: TrendItemProps) => {
  return (
    <Link to={`/hashtag/${trend.name}`}>
      <article className="trend-item">
        {/* <p className="trend-item__category">{trend.name}</p> */}

        <h3 className="trend-item__title">{`#${trend.name}`}</h3>

        <p className="trend-item__posts">{`Posts: ${trend.post_count}`}</p>
      </article>
    </Link>
  );
};

export default TrendItem;
