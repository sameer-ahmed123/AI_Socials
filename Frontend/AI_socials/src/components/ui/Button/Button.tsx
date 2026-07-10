import "./Button.css";
import type { ButtonProps } from "./Button.types";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        button
        button--${variant}
        button--${size}
        ${fullWidth ? "button--full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
