import "./Sidebar.css";

import Button from "../../ui/Button/Button";

import Logo from "./components/Logo/Logo";

import Navigation from "./components/Navigation/Navigation";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Logo />

      <Navigation />

      <Button fullWidth size="lg">
        Post
      </Button>
    </aside>
  );
};

export default Sidebar;
