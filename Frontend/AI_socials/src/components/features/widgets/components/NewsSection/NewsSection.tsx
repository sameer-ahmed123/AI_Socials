import Card from "../../../../ui/card/Card";
import NewsItem from "./components/NewsItem/NewsItem";

import "./NewsSection.css";
import EmptyState from "../../../../ui/EmptyState";
import { Newspaper } from "lucide-react";
import { useNews } from "../../hooks/useNews";

const NewsSection = () => {
  const { articles, loading, error } = useNews();
  console.log(articles);
  return (
    <Card className="news-section">
      <header className="news-section__header">
        <h2 className="news-section__title">Today's News</h2>
      </header>

      <div className="news-section__content">
        {loading && <p>Loading news...</p>}
        {!loading && error && (
          <EmptyState
            className="empty-state--compact"
            icon={<Newspaper size={42} />}
            title="Unable to load news"
            description={error}
          />
        )}
        {!loading &&
          !error &&
          articles.length > 0 &&
          articles.map((article) => <NewsItem article={article} />)}

        {!loading && !error && articles.length === 0 && (
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
