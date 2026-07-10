import { useRef, useState } from "react";

import Avatar from "../../../../ui/Avatar/Avatar";
import Button from "../../../../ui/Button/Button";
import Card from "../../../../ui/card/Card";
import TextArea from "../../../../ui/Textarea/TextArea";

import type { ComposerProps } from "./Composer.types";

import "./Composer.css";

const MAX_CHARACTERS = 280;

const Composer = ({ onCreatePost }: ComposerProps) => {
  const [content, setContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);

    resizeTextarea();
  };

  const resetComposer = () => {
    setContent("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "55px";
    }
  };

  const handleSubmit = () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    if (trimmedContent.length > MAX_CHARACTERS) return;

    onCreatePost({
      content: trimmedContent,
    });

    resetComposer();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();

      handleSubmit();
    }
  };

  const characterCount = content.length;

  const isOverLimit = characterCount > MAX_CHARACTERS;

  const canSubmit =
    content.trim().length > 0 &&
    !isOverLimit;

  return (
    <Card>
      <div className="composer">
        <Avatar initials="AI" />

        <div className="composer__content">
          <TextArea
            ref={textareaRef}
            placeholder="What's happening?"
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <div className="composer__footer">
            <div className="composer__status">

              <span
                className={`composer__counter ${
                  isOverLimit
                    ? "composer__counter--danger"
                    : ""
                }`}
              >
                {characterCount} / {MAX_CHARACTERS}
              </span>

              {isOverLimit && (
                <p className="composer__error">
                  Character limit exceeded.
                </p>
              )}

            </div>

            <Button
              variant="secondary"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="composer__button"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Composer;