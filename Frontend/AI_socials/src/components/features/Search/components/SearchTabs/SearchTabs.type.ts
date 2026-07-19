import type { SearchScope } from "../../hooks";
export interface SearchTabsProps {
  scope: SearchScope;
  onChange(scope: SearchScope): void;
}
