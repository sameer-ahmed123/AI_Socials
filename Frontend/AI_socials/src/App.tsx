import SketchFilter from "./components/layout/SketchFilter";
import AppLayout from "./components/layout/AppLayout";
import Sidebar from "./components/features/sidebar/Sidbar";
import Timeline from "./components/features/Timeline/Timeline";
import Widgets from "./components/features/widgets/Widgets";
import { usePosts } from "./components/features/Posts";
function App() {
  const {
    posts,
    createPost,
    toggleBookmark,
    toggleLike,
    toggleRepost,
    handleReply,
  } = usePosts();
  return (
    <>
      <SketchFilter />
      <AppLayout
        sidebar={<Sidebar />}
        timeline={
          <Timeline
            posts={posts}
            onCreatePost={createPost}
            onBookmark={toggleBookmark}
            onLike={toggleLike}
            onRepost={toggleRepost}
            onReply={handleReply}
          />
        }
        widgets={<Widgets />}
      />

     
    </>
  );
}

export default App;
