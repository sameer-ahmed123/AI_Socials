import { useState } from "react";

import Button from "../../../../ui/Button/Button";
import type { ComposerProps } from "./Composer.types";

import "./Composer.css";
import Card from "../../../../ui/card/Card";
import Avatar from "../../../../ui/Avatar/Avatar";
import TextArea from "../../../../ui/Textarea/TextArea";

const Composer = ({ onCreatePost }: ComposerProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    onCreatePost({
      content: trimmedContent,
    });

    setContent("");
  };

  return (
    <Card>
      <div className="composer">
        <Avatar initials="AI" />

        <div className="composer__content">
          <TextArea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="composer__footer">
            <Button
              style={{
                paddingLeft: "15px",
                paddingRight: "15px",
                paddingTop: "3px",
                paddingBottom: "3px",
                borderRadius: "8px",
              }}
              variant="secondary"
              onClick={handleSubmit}
              disabled={!content.trim()}
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
