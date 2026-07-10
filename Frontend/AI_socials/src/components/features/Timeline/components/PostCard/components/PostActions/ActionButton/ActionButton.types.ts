import type { ReactNode } from "react";

export interface ActionButtonProps {
  icon: ReactNode;

  label: string;

  count?: number;

  active?: boolean;

  activeClassName?: string;

  onClick: () => void;
}