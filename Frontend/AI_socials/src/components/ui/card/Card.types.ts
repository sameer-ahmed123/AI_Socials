import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;

  className?: string;

  variant?: "default" | "surface" | "accent";

  padding?: "none" | "sm" | "md" | "lg";

  hover?: boolean;
}