import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import "./CollapseButton.css";

import type { CollapseButtonProps } from "./CollapseButton.types";

const CollapseButton = ({ collapsed, onToggle }: CollapseButtonProps) => {
  return (
    <button
      className={`collapse-button ${
        collapsed ? "collapse-button--collapsed" : ""
      }`}
      onClick={onToggle}
    >
      {collapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}

      <span className="collapse-button__label">Collapse</span>
    </button>
  );
};

export default CollapseButton;
