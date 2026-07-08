import "./AppLayout.css";

import type { AppLayoutProps } from "./AppLayout.types";

const AppLayout = ({
  sidebar,
  timeline,
  widgets,
}: AppLayoutProps) => {
  return (
    <main className="app-layout">

      <aside className="app-layout__sidebar">
        {sidebar}
      </aside>

      <section className="app-layout__timeline">
        {timeline}
      </section>

      <aside className="app-layout__widgets">
        {widgets}
      </aside>

    </main>
  );
};

export default AppLayout;