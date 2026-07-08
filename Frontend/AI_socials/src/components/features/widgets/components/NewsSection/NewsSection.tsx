import Card from "../../../../ui/card/Card";

import NewsItem from "./components/NewsItem/NewsItem";

import type { NewsSectionProps } from "./NewsSection.types";

import "./NewsSection.css";

const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <Card className="news-section">
      <header className="news-section__header">
        <h2 className="news-section__title">Today's News</h2>
      </header>

      <div className="news-section__content">
        {news.map((article) => (
          <NewsItem key={article.id} article={article} />
        ))}
      </div>
    </Card>
  );
};

export default NewsSection;
