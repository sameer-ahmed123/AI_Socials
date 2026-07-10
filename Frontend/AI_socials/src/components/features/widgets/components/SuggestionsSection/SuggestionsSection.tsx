import Card from "../../../../ui/card/Card";
import SuggestionItem from "./components/SuggestionItem/SuggestionItem";
import type { SuggestionsSectionProps } from "./SuggestionsSection.types";

import "./SuggestionsSection.css";

const SuggestionsSection = ({ users }: SuggestionsSectionProps) => {
  return (
    <Card className="suggestions-section">
      <header className="suggestions-section__header">
        <h2 className="suggestions-section__title">Who to Follow</h2>
      </header>

      <div className="suggestions-section__content">
        {users.map((user) => (
          <SuggestionItem color={user.color}  key={user.id} user={user} />
        ))}
      </div>
    </Card>
  );
};

export default SuggestionsSection;
