import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: "primary" | "secondary" | "ghost";

  size?: "sm" | "md" | "lg";

  fullWidth?: boolean;
  onClick?: () => void;

  disabled?: boolean;
  className?: string;
}
