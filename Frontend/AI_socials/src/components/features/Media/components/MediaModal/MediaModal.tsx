import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { MediaModalProps } from "./MediaModal.types";

import "./MediaModal.css";

const MediaModal = ({ imageUrl, isOpen, onClose }: MediaModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="media-modal__backdrop" onClick={onClose}>
      <div
        className="media-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="media-modal__close"
          onClick={onClose}
          aria-label="Close image"
        >
          x
        </button>

        <img src={imageUrl} alt="Post media" className="media-modal__image" />
      </div>
    </div>,
    document.body,
  );
};

export default MediaModal;
