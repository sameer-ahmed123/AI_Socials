import type { ReactNode } from "react";

export type ActionButtonVariant =
  | "reply"
  | "like"
  | "repost"
  | "bookmark"
  | "delete";

export interface ActionButtonProps {
  icon: ReactNode;

  count?: number;

  active?: boolean;

  variant: ActionButtonVariant;

  onClick?: () => void;

  ariaLabel: string;
}
