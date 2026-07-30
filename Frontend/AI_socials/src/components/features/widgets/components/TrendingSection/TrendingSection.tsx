import Card from "../../../../ui/card/Card";
import TrendItem from "./components/TrendItem/TrendItem";
// import type { TrendingSectionProps } from "./TrendingSection.types";
import "./TrendingSection.css";
import EmptyState from "../../../../ui/EmptyState";
import { TrendingUp, AlertCircle } from "lucide-react";
import type { Trending } from "../../models/Trend.model";
import { useTrending } from "../../hooks/useTrending";

const TrendingSection = () => {
  const { hashtags, loading, error } = useTrending();

  return (
    <Card className="trending-section">
      <header className="trending-section__header">
        <h2 className="trending-section__title">Today's Trends</h2>
      </header>

      <div className="trending-section__content">
        {loading ? (
          <div className="trending-section__loading">
            <p>Loading trends...</p>
          </div>
        ) : error ? (
          <EmptyState
            className="empty-state--compact"
            icon={<AlertCircle size={42} />}
            title="Something went wrong"
            description={error}
          />
        ) : hashtags.length > 0 ? (
          hashtags.map((trend: Trending) => (
            <TrendItem key={trend.name} trend={trend} />
          ))
        ) : (
          <EmptyState
            className="empty-state--compact"
            icon={<TrendingUp size={42} />}
            title="No trends available"
            description="Trending topics will appear here as people start talking."
          />
        )}
      </div>
    </Card>
  );
};

export default TrendingSection;
