import "./NavItem.css";

import { ICONS } from "../Icons/registry";

import type { NavItemProps } from "./NavItem.types";

const NavItem = ({ icon, label, active = false }: NavItemProps) => {
  const Icon = ICONS[icon];

  return (
    <button className={`nav-item ${active ? "nav-item--active" : ""}`}>
      <span className="nav-item__icon">
        <Icon size={22} />
      </span>

      <span className="nav-item__label">{label}</span>
    </button>
  );
};

export default NavItem;
