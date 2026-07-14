import PostCard from "../../features/Timeline/components/PostCard/PostCard";
import type { Post } from "../../../models/Post.model";
import type { PostCardHandlers } from "../../features/Timeline/components/PostCard/PostCard.types";

interface Props {
  count?: number;
}
const SKELETON_POST: Post = {
  id: -1,

  author: {
    id: -1,
    username: "",
    display_name: "",
    avatar: "",
    bio: "",
    is_verified: false,
  },

  content: "",

  image: null,

  created_at: new Date().toISOString(),

  updated_at: new Date().toISOString(),
};

const SKELETON_HANDLERS: PostCardHandlers = {
  onReply: () => {},

  onLike: () => {},

  onRepost: () => {},

  onBookmark: () => {},

  onDelete: async () => {},
};

const PostCardSkeleton = ({ count = 3 }: Props) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PostCard
          key={index}
          loading
          post={SKELETON_POST}
          handlers={SKELETON_HANDLERS}
        />
      ))}
    </>
  );
};

export default PostCardSkeleton;
