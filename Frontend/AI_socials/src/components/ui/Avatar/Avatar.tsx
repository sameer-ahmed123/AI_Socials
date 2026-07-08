import "./Avatar.css";
import type { AvatarProps } from "./Avatar.types";

const Avatar = ({
  initials = "?",
  image,
  alt = "Avatar",
  size = "md",
  color = "yellow",
  className = "",
  ...props
}: AvatarProps) => {
  return (
    <div
      className={`
        avatar
        avatar--${size}
        avatar--${color}
        ${className}
      `}
      {...props}
    >
      {image ? (
        <img src={image} alt={alt} className="avatar__image" />
      ) : (
        <span className="avatar__initials">
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;