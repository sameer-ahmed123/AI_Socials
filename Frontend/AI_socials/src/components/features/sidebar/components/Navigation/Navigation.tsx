import NavItem from "../NavItem/NavItem";

import { SIDEBAR_ITEMS } from "../../constants/SidebarItems";
import type { NavigationProps } from "./Navigation.types";

const Navigation = ({ collapsed }: NavigationProps) => {
  return (
    <nav className="navigation">
      {SIDEBAR_ITEMS.map((item) => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          to={item.to}
          collapsed={collapsed}
        />
      ))}
    </nav>
  );
};

export default Navigation;
