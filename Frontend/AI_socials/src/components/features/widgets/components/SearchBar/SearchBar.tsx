import { useState } from "react";

import Card from "../../../../ui/card/Card";
import Input from "../../../../ui/Input/Input";

import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <Card padding="sm">
      <Input
        placeholder="Search AI Social..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Card>
  );
};

export default SearchBar;
