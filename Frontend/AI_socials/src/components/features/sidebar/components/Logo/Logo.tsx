import "./Logo.css";

import type { LogoProps } from "./Logo.types";

const Logo = ({ collapsed }: LogoProps) => {
  return (
    <div
      className={`sidebar-logo ${collapsed ? "sidebar-logo--collapsed" : ""}`}
    >
      <span className="sidebar-logo__full">SketchX</span>

      <span className="sidebar-logo__compact">SX</span>
    </div>
  );
};

export default Logo;
