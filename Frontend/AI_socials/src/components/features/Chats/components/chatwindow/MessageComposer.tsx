import "./MessageComposer.css";
import { useState } from "react";
import { useSendMessage } from "../../hooks/useSendMessage";

interface Props {
  conversationId: number;
}

const MessageComposer = ({ conversationId }: Props) => {
  const [content, setContent] = useState("");
  const { createMessage } = useSendMessage();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }
    await createMessage(conversationId, content);
    setContent("");
  }

  return (
    <form className="message-composer" onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a message..."
      />

      <button type="submit">Send</button>
    </form>
  );
};

export default MessageComposer;
