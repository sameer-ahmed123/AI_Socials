import { useState } from "react";

import Card from "../../../../ui/card/Card";
import Avatar from "../../../../ui/Avatar/Avatar";
import TextArea from "../../../../ui/Textarea/TextArea";
import Button from "../../../../ui/Button/Button";

import type { ComposerProps } from "./Composer.types";

import "./Composer.css";

const Composer = ({ onSubmit }: ComposerProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const value = content.trim();

    if (!value) return;

    onSubmit(value);

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
            <Button onClick={handleSubmit}>Post</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Composer;
