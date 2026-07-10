import "./EmptyState.css";

import type { EmptyStateProps } from "./EmptyState.types";

const EmptyState = ({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) => {
  return (
    <section className={`empty-state ${className}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}

      <h2 className="empty-state__title">{title}</h2>

      <p className="empty-state__description">{description}</p>

      {action && <div className="empty-state__action">{action}</div>}
    </section>
  );
};

export default EmptyState;
