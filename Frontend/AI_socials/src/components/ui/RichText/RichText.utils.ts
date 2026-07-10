import type { RichTextToken } from "./RichText.types";

const TOKEN_REGEX =
  /(https?:\/\/[^\s]+)|(@[A-Za-z0-9_]+)|(#[A-Za-z0-9_]+)/g;

export const tokenizeText = (
  text: string,
): RichTextToken[] => {
  const tokens: RichTextToken[] = [];

  let lastIndex = 0;

  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        value: text.slice(lastIndex, match.index),
      });
    }

    const value = match[0];

    let type: RichTextToken["type"] = "text";

    if (value.startsWith("http")) {
      type = "url";
    } else if (value.startsWith("@")) {
      type = "mention";
    } else if (value.startsWith("#")) {
      type = "hashtag";
    }

    tokens.push({
      type,
      value,
    });

    lastIndex = TOKEN_REGEX.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  return tokens;
};