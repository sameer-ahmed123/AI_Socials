import type { SuggestedUser } from "../../../models";

export interface SuggestionItemProps {
  user: SuggestedUser;
  onFollow?: (userId: string) => void;
}
