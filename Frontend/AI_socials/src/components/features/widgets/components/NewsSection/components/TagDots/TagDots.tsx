import "./TagDots.css";

import type { TagDotsProps } from "./TagDots.types";

const TagDots = ({ colors = ["#ffb3ba","#bae1ff","#baffc9"] }: TagDotsProps) => {
  return (
    <div className="tag-dots">
      {colors.map((color, index) => (
        <span
          key={index}
          className="tag-dots__dot"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default TagDots;
