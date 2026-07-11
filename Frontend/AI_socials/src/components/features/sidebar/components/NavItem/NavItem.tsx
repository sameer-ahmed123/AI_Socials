import { NavLink } from "react-router-dom";
import "./NavItem.css";
import { ICONS } from "../Icons/registry";
import type { NavItemProps } from "./NavItem.types";
import { useLocation } from "react-router-dom";

const NavItem = ({ icon, label, to, collapsed }: NavItemProps) => {
  const Icon = ICONS[icon];
  const location = useLocation();
  const isProfileRoute =
    to.startsWith("/profile") && location.pathname.startsWith("/profile");
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        [
          "nav-item",
          collapsed && "nav-item--collapsed",
          (isActive || isProfileRoute) && "nav-item--active",
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      <span className="nav-item__icon">
        <Icon size={22} />
      </span>

      <span className="nav-item__label">{label}</span>
    </NavLink>
  );
};

export default NavItem;
