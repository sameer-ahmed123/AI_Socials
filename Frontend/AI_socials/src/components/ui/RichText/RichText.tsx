import "./RichText.css";
import { Link } from "react-router-dom";
import type { RichTextProps } from "./RichText.types";

import { tokenizeText } from "./RichText.utils";

const RichText = ({ text }: RichTextProps) => {
  const tokens = tokenizeText(text);

  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case "url":
            return (
              <a
                key={index}
                href={token.value}
                target="_blank"
                rel="noopener noreferrer"
                className="rich-text__external-link"
              >
                {token.value}
              </a>
            );

          case "mention":
            return (
              <Link
                key={index}
                to={`/profile/${token.value.slice(1)}`}
                className="rich-text__internal-link"
              >
                {token.value}
              </Link>
            );

          case "hashtag":
            return (
              <Link
                key={index}
                to={`/hashtag/${token.value.slice(1)}`}
                className="rich-text__internal-link"
              >
                {token.value}
              </Link>
            );

          default:
            return <span key={index}>{token.value}</span>;
        }
      })}
    </>
  );
};

export default RichText;
