import SketchFilter from "./components/layout/SketchFilter";
import AppLayout from "./components/layout/AppLayout";
import Sidebar from "./components/features/sidebar/Sidbar";

function App() {
  return (
    <>
      <SketchFilter />

      <AppLayout
        sidebar={<Sidebar />}
        timeline={<div>Timeline</div>}
        widgets={<div>Widgets</div>}
      />
    </>
  );
}

export default App;
