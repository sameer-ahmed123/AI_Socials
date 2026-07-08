import type { TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "composer";

  resize?: "none" | "vertical" | "horizontal" | "both";
}