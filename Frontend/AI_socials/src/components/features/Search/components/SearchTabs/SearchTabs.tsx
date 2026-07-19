import "./SearchTabs.css";

import type { SearchTabsProps } from "./SearchTabs.type";

const SearchTabs = ({ scope, onChange }: SearchTabsProps) => {
  return (
    <nav className="search-tabs">
      <button
        className={scope === "posts" ? "active" : ""}
        onClick={() => onChange("posts")}
      >
        Posts
      </button>

      <button
        className={scope === "users" ? "active" : ""}
        onClick={() => onChange("users")}
      >
        Users
      </button>

      <button
        className={scope === "hashtags" ? "active" : ""}
        onClick={() => onChange("hashtags")}
      >
        Hashtags
      </button>
    </nav>
  );
};

export default SearchTabs;
