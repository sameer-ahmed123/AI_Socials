import "./ErrorState.css";

import type { ErrorStateProps } from "./ErrorState.types";

const ErrorState = ({
  title,
  description,
  action,
  icon,
  className = "",
}: ErrorStateProps) => {
  return (
    <section className={`error-state ${className}`}>
      {icon && <div className="error-state__icon">{icon}</div>}

      <h2 className="error-state__title">{title}</h2>

      <p className="error-state__description">{description}</p>

      {action && <div className="error-state__action">{action}</div>}
    </section>
  );
};

export default ErrorState;
