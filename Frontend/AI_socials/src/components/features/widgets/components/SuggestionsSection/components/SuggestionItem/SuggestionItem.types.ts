import type { SuggestedUser } from "../../../../models";

export interface SuggestionItemProps {
  color?: "yellow" | "blue" | "green" | "red" | "purple" | "gray";
  user: SuggestedUser;
  onFollow?: (userId: string) => void;
}
