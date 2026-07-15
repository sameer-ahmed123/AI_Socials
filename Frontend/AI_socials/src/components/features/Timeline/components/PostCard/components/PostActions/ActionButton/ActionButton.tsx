import "./ActionButton.css";

import type { ActionButtonProps } from "./ActionButton.types";

const ActionButton = ({
  icon,
  count,
  active = false,
  variant,
  onClick,
  ariaLabel,
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`
        action-button
        action-button--${variant}
        ${active ? "action-button--active" : ""}
      `}
    >
      <span className="action-button__icon">{icon}</span>

      {count !== undefined && (
        <span className="action-button__count">{count}</span>
      )}
    </button>
  );
};

export default ActionButton;
