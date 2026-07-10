import Card from "../../../../ui/card/Card";

import NewsItem from "./components/NewsItem/NewsItem";

import type { NewsSectionProps } from "./NewsSection.types";

import "./NewsSection.css";
import EmptyState from "../../../../ui/EmptyState";
import { Newspaper } from "lucide-react";

const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <Card className="news-section">
      <header className="news-section__header">
        <h2 className="news-section__title">Today's News</h2>
      </header>

      <div className="news-section__content">
        {news.length > 0 ? (
          news.map((article) => <NewsItem key={article.id} article={article} />)
        ) : (
          <EmptyState
          className="empty-state--compact"
            icon={<Newspaper size={42} />}
            title="No news today"
            description="We'll keep you updated when new stories arrive."
          />
        )}
      </div>
    </Card>
  );
};

export default NewsSection;
