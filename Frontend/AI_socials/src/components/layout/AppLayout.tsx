import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import { useLayout } from "../../context/LayoutContext";

import type { AppLayoutProps } from "./AppLayout.types";

const AppLayout = ({
  sidebar,
  // timeline,
  widgets,
}: AppLayoutProps) => {
  const { collapsed } = useLayout();
  return (
    <main
      className={collapsed ? "app-layout app-layout--collapsed" : "app-layout"}
    >
      <aside className="app-layout__sidebar">{sidebar}</aside>

      <section className="app-layout__main">
        {/* {timeline} */}
        <Outlet />
      </section>

      <aside className="app-layout__widgets">{widgets}</aside>
    </main>
  );
};

export default AppLayout;
