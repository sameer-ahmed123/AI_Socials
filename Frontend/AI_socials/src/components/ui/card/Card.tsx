import "./Card.css";

import type { CardProps } from "./card.types.ts";

const Card = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hover = false,
}: CardProps) => {
  return (
    <div
      className={`
        card
        card--${variant}
        card--padding-${padding}
        ${hover ? "card--hover" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;