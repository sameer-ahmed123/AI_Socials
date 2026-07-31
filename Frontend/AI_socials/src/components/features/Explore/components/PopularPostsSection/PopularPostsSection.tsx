import Card from "../../../../../components/ui/card/Card";
import LoadingScreen from "../../../../../components/common/loadingScreen/LoadingScreen";
import EmptyState from "../../../../../components/ui/EmptyState";

import { usePopularPosts } from "../../../../../components/features/Explore/hooks/usePopularPosts";
import PopularPost from "./components/PopularPost";
import { Link } from "react-router-dom";

const PopularPostsSection = () => {
  const { posts, loading, error } = usePopularPosts();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <EmptyState title="Unable to load popular posts" description={error} />
    );
  }

  if (!posts.length) {
    return (
      <EmptyState
        title="No popular posts"
        description="Popular posts will appear here."
      />
    );
  }

  return (
    <Card className="popular-posts-card">
      <header className="popular-posts-section__header">
        <div className="popular-posts-section__title-group">
          <div className="popular-posts-section__title">
            <span className="popular-posts-section__icon">⭐️</span>
            <h2>Popular Posts</h2>
          </div>
          <p className="popular-posts-section__subtitle">
            Top posts getting the most engagement
          </p>
        </div>
        <Link to="/explore/posts" className="popular-posts-section__view-all">
          View all
        </Link>
      </header>

      {/* Added container for scroll handling */}
      <div className="popular-posts-section__scroll-container">
        {posts.map((post) => (
          <PopularPost key={post.id} post={post} />
        ))}
      </div>
    </Card>
  );
};

export default PopularPostsSection;
