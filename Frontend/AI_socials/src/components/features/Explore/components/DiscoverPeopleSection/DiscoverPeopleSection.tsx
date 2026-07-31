import Card from "../../../../../components/ui/card/Card";
import EmptyState from "../../../../../components/ui/EmptyState/EmptyState";
import LoadingScreen from "../../../../../components/common/loadingScreen/LoadingScreen";
import { useDiscoverPeople } from "../../../../../components/features/Explore/hooks/useDiscoverPeople";
import DiscoverPersonItem from "./components/DiscoverPersonItem";
import { Link } from "react-router-dom";

import "./DiscoverPeopleSection.css";

const DiscoverPeopleSection = () => {
  const { users, loading, error } = useDiscoverPeople();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <EmptyState title="Unable to load people" description={error} />;
  }

  if (!users.length) {
    return (
      <EmptyState
        title="No people to discover"
        description="Check back later for new creators."
      />
    );
  }

  return (
    <Card className="discover-people-section">
      <header className="discover-people-section__header">
        <div className="discover-people-section__title-group">
          <div className="discover-people-section__title">
            <span className="discover-people-section__icon">👥</span>
            <h2>Discover People</h2>
          </div>
          <p className="discover-people-section__subtitle">
            People you might find interesting
          </p>
        </div>
        <Link
          to="/explore/people"
          className="discover-people-section__view-all"
        >
          View all
        </Link>
      </header>

      <div className="discover-people-section__content">
        {users.map((user) => (
          <DiscoverPersonItem key={user.id} user={user} />
        ))}
      </div>
    </Card>
  );
};

export default DiscoverPeopleSection;
