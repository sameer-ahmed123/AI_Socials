import { forwardRef } from "react";

import type { TextAreaProps } from "./TextArea.types";

import "./TextArea.css";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", variant, resize, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`
        textarea
        textarea--${variant}
        textarea--resize-${resize}
        ${className}
      `}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
