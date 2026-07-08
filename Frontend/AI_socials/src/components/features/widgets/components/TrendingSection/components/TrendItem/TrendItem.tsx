import type { TrendItemProps } from "./TrendItem.types";

import "./TrendItem.css";

const TrendItem = ({ trend }: TrendItemProps) => {
  return (
    <article className="trend-item">
      <p className="trend-item__category">{trend.category}</p>

      <h3 className="trend-item__title">{trend.title}</h3>

      <p className="trend-item__posts">{trend.posts}</p>
    </article>
  );
};

export default TrendItem;
