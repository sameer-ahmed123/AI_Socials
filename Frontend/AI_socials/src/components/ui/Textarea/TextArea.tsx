import "./TextArea.css";

import type { TextAreaProps } from "./TextArea.types";

const TextArea = ({
  variant = "default",
  resize = "none",
  className = "",
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      className={`
        textarea
        textarea--${variant}
        textarea--resize-${resize}
        ${className}
      `}
      {...props}
    />
  );
};

export default TextArea;