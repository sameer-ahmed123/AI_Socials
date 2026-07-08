import SketchFilter from "./components/layout/SketchFilter";
import AppLayout from "./components/layout/AppLayout";
import Sidebar from "./components/features/sidebar/Sidbar";
import Timeline from "./components/features/Timeline/Timeline";
import Widgets from "./components/features/widgets/Widgets";

function App() {
  return (
    <>
      <SketchFilter />

      <AppLayout
        sidebar={<Sidebar />}
        timeline={<Timeline />}
        widgets={<Widgets />}
      />
    </>
  );
}

export default App;
