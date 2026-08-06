import "./MessageComposer.css";
import { useState } from "react";
import type { SearchUser } from "../../../Search/types/SearchUser.model";

interface Props {
  currentUser: SearchUser;
  onSend: (content: string, user: SearchUser) => Promise<void>;
}

const MessageComposer = ({ currentUser, onSend }: Props) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setContent(""); // Clear input immediately for better UX
      await onSend(trimmed, currentUser);
    } catch (err) {
      // Revert content if send fails
      setContent(trimmed);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="message-composer" onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a message..."
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting || !content.trim()}>
        Send
      </button>
    </form>
  );
};

export default MessageComposer;
