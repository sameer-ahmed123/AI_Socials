import { useRef, useState, type FormEvent } from "react";

import Avatar from "../../../../ui/Avatar/Avatar";
import Button from "../../../../ui/Button/Button";
import Card from "../../../../ui/card/Card";
import TextArea from "../../../../ui/Textarea/TextArea";

import type { ComposerProps } from "./Composer.types";

import "./Composer.css";
import { useAuth } from "../../../../../hooks/useAuth";

const MAX_CHARACTERS = 280;

const Composer = ({ onCreatePost }: ComposerProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    resizeTextarea();
  };

  const resetComposer = () => {
    setContent("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "55px";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content.trim()) return;

    setLoading(true);

    try {
      await onCreatePost({
        content,
      });
      resetComposer();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();

      event.currentTarget.form?.requestSubmit();
    }
  };

  const characterCount = content.length;

  const isOverLimit = characterCount > MAX_CHARACTERS;

  const canSubmit = content.trim().length > 0 && !isOverLimit && !loading;

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="composer">
          <Avatar image={user?.avatar} initials={user?.display_name} />

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
                    isOverLimit ? "composer__counter--danger" : ""
                  }`}
                >
                  {characterCount} / {MAX_CHARACTERS}
                </span>

                {isOverLimit && (
                  <p className="composer__error">Character limit exceeded.</p>
                )}
              </div>

              <Button
                type="submit"
                variant="secondary"
                disabled={!canSubmit}
                className="composer__button"
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Composer;
