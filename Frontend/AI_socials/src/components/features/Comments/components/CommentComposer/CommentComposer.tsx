import { useState } from "react";

import "./CommentComposer.css";

import type { CommentComposerProps } from "./CommentComposer.types";

import Button from "../../../../ui/Button/Button";
import TextArea from "../../../../ui/Textarea/TextArea";

const MAX_CHARACTERS = 280;

const CommentComposer = ({
  loading = false,
  onSubmit,
}: CommentComposerProps) => {
  const [content, setContent] = useState("");

  const submitting = loading;

  const remaining = MAX_CHARACTERS - content.length;

  const disabled =
    submitting ||
    content.trim().length === 0 ||
    content.length > MAX_CHARACTERS;

  const handleSubmit = async () => {
    const value = content.trim();

    if (!value) return;

    try {
      await onSubmit({
        content: value,
      });

      setContent("");
    } catch {
      // let useComments expose the error
    }
  };

  return (
    <section className="comment-composer">
      <TextArea
        value={content}
        placeholder="Post your reply..."
        maxLength={MAX_CHARACTERS}
        onChange={(e) => setContent(e.target.value)}
      />

      <footer className="comment-composer__footer">
        <span
          className={`comment-composer__count ${
            remaining < 20 ? "comment-composer__count--warning" : ""
          }`}
        >
          {remaining}
        </span>

        <Button onClick={handleSubmit} disabled={disabled}>
          Reply
        </Button>
      </footer>
    </section>
  );
};

export default CommentComposer;
