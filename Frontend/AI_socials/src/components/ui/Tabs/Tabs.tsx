import "./Tabs.css";
import type { TabsProps } from "./Tabs.types";

const Tabs = ({
  items,
  activeTab,
  onChange,
  fullWidth = true,
}: TabsProps) => {
  return (
    <div
      className={`tabs ${fullWidth ? "tabs--full" : ""}`}
    >
      {items.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${
            activeTab === tab.id ? "tab--active" : ""
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;