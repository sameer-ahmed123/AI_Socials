import Timeline from "../../components/features/Timeline/Timeline";
import { usePosts } from "../../components/features/Posts";
import PageContent from "../../components/ui/PageContent";
const HomePage = () => {
  const {
    posts,
    createPost,
    toggleBookmark,
    toggleLike,
    toggleRepost,
    handleReply,
  } = usePosts();
  return (
    <PageContent>
      <Timeline
        posts={posts}
        onCreatePost={createPost}
        onBookmark={toggleBookmark}
        onLike={toggleLike}
        onRepost={toggleRepost}
        onReply={handleReply}
      />
    </PageContent>
  );
};

export default HomePage;
