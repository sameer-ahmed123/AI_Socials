import "./ActionButton.css";

import type { ActionButtonProps } from "./ActionButton.types";

const ActionButton = ({
  icon,
  label,
  count,
  active = false,
  activeClassName = "",
  onClick,
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      className={`
        action-button
        ${active ? "action-button--active" : ""}
        ${active ? activeClassName : ""}
      `}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <span className="action-button__icon">
        {icon}
      </span>

      {typeof count === "number" && (
        <span className="action-button__count">
          {count}
        </span>
      )}
    </button>
  );
};

export default ActionButton;