import NavItem from "../NavItem/NavItem";

import { SIDEBAR_ITEMS } from "../../constants/SidebarItems";
import type { NavigationProps } from "./Navigation.types";
import { useAuth } from "../../../../../hooks/useAuth";

const Navigation = ({ collapsed }: NavigationProps) => {
  const { user } = useAuth();
  const visibleItems = SIDEBAR_ITEMS.filter((item) => {
    if (!item.requiresAuth) {
      return true;
    }

    return user !== null;
  });
  return (
    <nav className="navigation">
      {visibleItems.map((item) => (
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
