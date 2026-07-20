import { useState } from "react";
import MediaModal from "../MediaModal/MediaModal";
import "./MediaViewer.css";

import type { MediaViewerProps } from "./MediaViewer.types";

const MediaViewer = ({ media }: MediaViewerProps) => {
  const firstImage = media[0];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="media-viewer" onClick={() => setIsOpen(true)}>
        <img
          src={firstImage.image_url}
          alt=""
          className="media-viewer__image"
        />
      </div>
      <MediaModal
        imageUrl={firstImage.image_url}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default MediaViewer;
