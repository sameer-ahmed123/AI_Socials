import  type { HTMLAttributes } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials?: string;

  image?: string;

  alt?: string;

  size?: "sm" | "md" | "lg";

  color?: "yellow" | "blue" | "green" | "red" | "purple" | "gray";
}