import type { ReactNode } from "react";

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactNode;

  items: DropdownMenuItem[];

  className?: string;
}
