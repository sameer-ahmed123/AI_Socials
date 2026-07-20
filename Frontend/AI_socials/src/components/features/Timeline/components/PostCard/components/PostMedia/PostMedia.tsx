import "./PostMedia.css";
import type { PostMediaProps } from "./PostMedia.types";

const PostMedia = ({ media }: PostMediaProps) => {
  if (media.length === 0) {
    return null;
  }

  return (
    <div className="post-media">
      <img
        src={media[0].image_url}
        alt="Post attachment"
        className="post-media__image"
      />
    </div>
  );
};

export default PostMedia;
