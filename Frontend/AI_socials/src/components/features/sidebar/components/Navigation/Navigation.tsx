import NavItem from "../NavItem/NavItem";

import { SIDEBAR_ITEMS } from "../../constants/SidebarItems";

const Navigation = () => {
  return (
    <nav>
      {SIDEBAR_ITEMS.map((item) => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={item.id === "home"}
        />
      ))}
    </nav>
  );
};

export default Navigation;
