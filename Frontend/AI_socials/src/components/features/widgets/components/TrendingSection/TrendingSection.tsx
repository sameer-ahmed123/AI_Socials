import Card from "../../../../ui/card/Card";
import TrendItem from "./components/TrendItem/TrendItem";
import { MOCK_TRENDS } from "../../data/mockTrends";
// import type { TrendingSectionProps } from "./TrendingSection.types";
import "./TrendingSection.css";
import EmptyState from "../../../../ui/EmptyState";
import { TrendingUp } from "lucide-react";

const TrendingSection = () => {
  return (
    <Card className="trending-section">
      <header className="trending-section__header">
        <h2 className="trending-section__title">Today's Trends</h2>
      </header>

      <div className="trending-section__content">
        {MOCK_TRENDS.length > 0 ? (
          MOCK_TRENDS.map((trend) => <TrendItem key={trend.id} trend={trend} />)
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
