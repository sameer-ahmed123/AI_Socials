export interface RichTextProps {
  text: string;
}

export type TokenType =
  | "text"
  | "mention"
  | "hashtag"
  | "url";

export interface RichTextToken {
  type: TokenType;

  value: string;
}