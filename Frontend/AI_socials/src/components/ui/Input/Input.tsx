import "./Input.css";
import type { InputProps } from "./Input.types";

const Input = ({
  variant = "default",
  className = "",
  ...props
}: InputProps) => {
  return (
    <input
      className={`
        input
        input--${variant}
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;