import TagDots from "../TagDots/TagDots";

import type { NewsItemProps } from "./NewsItem.types";

import "./NewsItem.css";

const NewsItem = ({ article }: NewsItemProps) => {
  return (
    <article className="news-item">
      <h3 className="news-item__headline">{article.headline}</h3>

      <TagDots colors={article.dotColors} />

      <p className="news-item__meta">
        <span>{article.publishedAt}</span>

        <span>•</span>

        <span>{article.source}</span>

        <span>•</span>

        <span>{article.posts.toLocaleString()} Posts</span>
      </p>
    </article>
  );
};

export default NewsItem;
