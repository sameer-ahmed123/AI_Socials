import Card from "../../../../ui/card/Card";
import EmptyState from "../../../../ui/EmptyState";
import { TrendingUp } from "lucide-react";
import { useTrending } from "../../hooks/useTrending";
import TrendingHashtagItem from "./components/TrendingHashtagItem/TrendingHashtagItem";
import { Link } from "react-router-dom";

import "./TrendingHashtagsSection.css";

const TrendingHashtagsSection = () => {
  const { hashtags } = useTrending();

  return (
    <Card className="trending-hashtags-section">
      <header className="trending-hashtags-section__header">
        <div className="trending-hashtags-section__title-group">
          <div className="trending-hashtags-section__title">
            <span className="trending-hashtags-section__icon">🔥</span>
            <h2>Trending Hashtags</h2>
          </div>
          <p className="trending-hashtags-section__subtitle">
            What people are talking about right now
          </p>
        </div>
        <Link
          to="/explore/hashtags"
          className="trending-hashtags-section__view-all"
        >
          View all
        </Link>
      </header>

      <div className="trending-hashtags-section__content">
        {hashtags.length > 0 ? (
          hashtags.map((hashtag) => (
            <TrendingHashtagItem key={hashtag.name} hashtag={hashtag} />
          ))
        ) : (
          <EmptyState
            className="empty-state--compact"
            icon={<TrendingUp size={42} />}
            title="No trending hashtags"
            description="Trending hashtags will appear here."
          />
        )}
      </div>
    </Card>
  );
};

export default TrendingHashtagsSection;
