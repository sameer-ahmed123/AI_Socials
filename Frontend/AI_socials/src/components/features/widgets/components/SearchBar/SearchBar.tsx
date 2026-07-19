import Card from "../../../../ui/card/Card";
import Input from "../../../../ui/Input/Input";

import "./SearchBar.css";
import type { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({
  value,
  onSubmit,
  onChange,
  placeholder = "Search SketchX...",
}: SearchBarProps) => {
  return (
    <Card padding="sm">
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit?.();
          }
        }}
      />
    </Card>
  );
};

export default SearchBar;
