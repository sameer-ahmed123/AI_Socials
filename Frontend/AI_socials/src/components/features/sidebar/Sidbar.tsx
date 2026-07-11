import "./Sidebar.css";

import Button from "../../ui/Button/Button";

import Logo from "./components/Logo/Logo";
import { useLayout } from "../../layout/LayoutContext";
import Navigation from "./components/Navigation/Navigation";
import CollapseButton from "./components/CollapseButton";

const Sidebar = () => {
  const { collapsed, toggleSidebar } = useLayout();
  return (
    <aside
      className={`sidebar ${
        collapsed ? "sidebar--collapsed" : "sidebar--expanded"
      }`}
    >
      <Logo collapsed={collapsed} />

      <Navigation collapsed={collapsed} />

      <Button
        className={`sidebar__post-button ${
          collapsed ? "sidebar__post-button--collapsed" : ""
        }`}
        fullWidth={!collapsed}
        size="lg"
      >
        {collapsed ? "+" : "Post"}
      </Button>
      <CollapseButton collapsed={collapsed} onToggle={() => toggleSidebar()} />
    </aside>
  );
};

export default Sidebar;
