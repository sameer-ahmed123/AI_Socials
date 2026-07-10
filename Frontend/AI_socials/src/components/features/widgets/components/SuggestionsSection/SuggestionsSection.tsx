import Card from "../../../../ui/card/Card";
import SuggestionItem from "./components/SuggestionItem/SuggestionItem";
import type { SuggestionsSectionProps } from "./SuggestionsSection.types";

import "./SuggestionsSection.css";
import EmptyState from "../../../../ui/EmptyState";
import { Users } from "lucide-react";

const SuggestionsSection = ({ users }: SuggestionsSectionProps) => {
  return (
    <Card className="suggestions-section">
      <header className="suggestions-section__header">
        <h2 className="suggestions-section__title">Who to Follow</h2>
      </header>

      <div className="suggestions-section__content">
        {users.length > 0 ? (
          users.map((user) => (
            <SuggestionItem color={user.color} key={user.id} user={user} />
          ))
        ) : (
          <EmptyState
            className="empty-state--compact"
            icon={<Users size={42} />}
            title="Nobody to follow"
            description="Suggestions will appear here as the community grows."
          />
        )}
      </div>
    </Card>
  );
};

export default SuggestionsSection;
