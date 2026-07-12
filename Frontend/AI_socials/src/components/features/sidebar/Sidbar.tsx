import "./Sidebar.css";

import Button from "../../ui/Button/Button";

import Logo from "./components/Logo/Logo";
import { useLayout } from "../../../context/LayoutContext";
import Navigation from "./components/Navigation/Navigation";
import CollapseButton from "./components/CollapseButton";
import SidebarAuth from "./SidebarAuth";
import { useAuth } from "../../../hooks/useAuth";

const Sidebar = () => {
  const { collapsed, toggleSidebar } = useLayout();
  const { user } = useAuth();
  return (
    <aside
      className={`sidebar ${
        collapsed ? "sidebar--collapsed" : "sidebar--expanded"
      }`}
    >
      <Logo collapsed={collapsed} />

      <Navigation collapsed={collapsed} />

      {user && (
        <Button
          className={`sidebar__post-button ${
            collapsed ? "sidebar__post-button--collapsed" : ""
          }`}
          fullWidth={!collapsed}
          size="lg"
        >
          {collapsed ? "+" : "Post"}
        </Button>
      )}

      <CollapseButton collapsed={collapsed} onToggle={() => toggleSidebar()} />
      <SidebarAuth />
    </aside>
  );
};

export default Sidebar;
