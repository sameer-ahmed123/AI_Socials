import "./Widgets.css";

import SearchBar from "./components/SearchBar/SearchBar";
import SuggestionsSection from "./components/SuggestionsSection/SuggestionsSection";
import TrendingSection from "./components/TrendingSection/TrendingSection";

import { MOCK_USERS } from "./data/mockSuggestedUsers";
import { MOCK_NEWS } from "./data/mockNews";
import WidgetFooter from "./components/WidgetFooter/WidgetFooter";
import NewsSection from "./components/NewsSection/NewsSection";

const Widgets = () => {
  return (
    <aside className="widgets">
      <SearchBar />
      <NewsSection news={MOCK_NEWS} />
      <TrendingSection />

      <SuggestionsSection users={MOCK_USERS} />

      <WidgetFooter />
    </aside>
  );
};

export default Widgets;
