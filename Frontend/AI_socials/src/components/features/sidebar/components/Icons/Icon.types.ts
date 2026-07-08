import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export type IconName =
  | "home"
  | "explore"
  | "notifications"
  | "chat"
  | "ai"
  | "bookmarks"
  | "profile"
  | "more";
