import "./Widgets.css";

import SearchBar from "./components/SearchBar/SearchBar";
import SuggestionsSection from "./components/SuggestionsSection/SuggestionsSection";
import TrendingSection from "./components/TrendingSection/TrendingSection";

import { MOCK_USERS } from "./data/mockSuggestedUsers";
import WidgetFooter from "./components/WidgetFooter/WidgetFooter";
import NewsSection from "./components/NewsSection/NewsSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Widgets = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    const value = query.trim();

    if (!value) return;

    navigate(`/explore?q=${encodeURIComponent(value)}&scope=posts`);
  };

  return (
    <aside className="widgets">
      <SearchBar value={query} onChange={setQuery} onSubmit={handleSubmit} />
      <NewsSection />
      <TrendingSection />

      <SuggestionsSection users={MOCK_USERS} />

      <WidgetFooter />
    </aside>
  );
};

export default Widgets;
