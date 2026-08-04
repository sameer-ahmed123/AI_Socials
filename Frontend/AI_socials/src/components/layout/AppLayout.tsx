import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import { useLayout } from "../../context/LayoutContext";
import type { AppLayoutProps } from "./AppLayout.types";

const AppLayout = ({ sidebar, widgets }: AppLayoutProps) => {
  const { collapsed } = useLayout();

  const layoutClassName = [
    "app-layout",
    collapsed && "app-layout--collapsed",
    !widgets && "app-layout--no-widgets",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={layoutClassName}>
      <aside className="app-layout__sidebar">{sidebar}</aside>

      <section className="app-layout__main">
        <Outlet />
      </section>

      {widgets && <aside className="app-layout__widgets">{widgets}</aside>}
    </main>
  );
};

export default AppLayout;
