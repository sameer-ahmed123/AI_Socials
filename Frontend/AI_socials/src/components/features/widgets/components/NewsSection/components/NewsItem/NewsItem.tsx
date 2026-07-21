import "./NewsItem.css";
import type { NewsItemProps } from "./NewsItem.types";

const NewsItem = ({ article }: NewsItemProps) => {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
    },
  );

  return (
    <a
      className="news-item"
      href={article.articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read article: ${article.title}`}
    >
      <h3 className="news-item__headline">{article.title}</h3>

      <div className="news-item__meta">
        <span>{publishedDate}</span>

        <span>•</span>

        <span>{article.source}</span>
      </div>
    </a>
  );
};

export default NewsItem;
