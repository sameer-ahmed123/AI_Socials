import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import Button from "../../ui/Button/Button";

import "./SidebarAuth.css";
import { useLayout } from "../../../context/LayoutContext";

export default function SidebarAuth() {
  const { user, logout } = useAuth();
  const { collapsed } = useLayout();

  return (
    <div className="sidebar-auth">
      {user && (
        <div
          className={`sidebar-user ${collapsed ? "sidebar-user--collapsed" : ""}`}
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.display_name}
              className="sidebar-auth__avatar"
            />
          )}
          {collapsed ? (
            ""
          ) : (
            <span className="sidebar-auth__name">{user.display_name}</span>
          )}
        </div>
      )}

      {user ? (
        <Button variant="ghost" size="sm" onClick={logout} fullWidth>
          Logout
        </Button>
      ) : (
        <Link to="/login" style={{ width: "100%", textDecoration: "none" }}>
          <Button variant="ghost" size="sm" fullWidth>
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
