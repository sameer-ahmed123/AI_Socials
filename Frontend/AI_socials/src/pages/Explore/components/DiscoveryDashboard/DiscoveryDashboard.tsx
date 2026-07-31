import DiscoverPeopleSection from "../../../../components/features/Explore/components/DiscoverPeopleSection/DiscoverPeopleSection";
import PopularPostsSection from "../../../../components/features/Explore/components/PopularPostsSection/PopularPostsSection";
import TrendingHashtagsSection from "../../../../components/features/Explore/components/TrendingHashtagsSection/TrendingHashtagsSection";
import { useAuth } from "../../../../hooks/useAuth";
import "./DiscoveryDashboard.css";

const DiscoveryDashboard = () => {
  const { user } = useAuth();
  return (
    <section className="discovery-dashboard">
      <TrendingHashtagsSection />
      <PopularPostsSection />
      {user && <DiscoverPeopleSection />}
    </section>
  );
};

export default DiscoveryDashboard;
