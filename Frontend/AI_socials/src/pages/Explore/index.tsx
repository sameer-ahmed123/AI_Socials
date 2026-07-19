import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/ui/card/Card";
import PageContent from "../../components/ui/PageContent";
import SearchBar from "../../components/features/widgets/components/SearchBar/SearchBar";
import SearchTabs from "../../components/features/Search/components/SearchTabs/SearchTabs";
import SearchResults from "../../components/features/Search/components/SearchResults/SearchResults";
import { useSearch } from "../../components/features/Search/hooks";
import type { SearchScope } from "../../components/features/Search/hooks";
import { useDebounce } from "../../hooks/useDebounce";

const ExplorePage = () => {
  const hasInitialized = useRef(false);
  const { scope, results, loading, error, search } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const rawScope = searchParams.get("scope");
  const initialScope: SearchScope =
    rawScope === "posts" || rawScope === "users" || rawScope === "hashtags"
      ? rawScope
      : "posts";

  const [input, setInput] = useState(initialQuery);
  const debouncedQuery = useDebounce(input, 300);

  const performSearch = (nextQuery: string, nextScope: SearchScope = scope) => {
    search(nextQuery, nextScope);
    const trimmed = nextQuery.trim();
    if (!trimmed) {
      setSearchParams({});
      return;
    }
    setSearchParams({
      q: trimmed,
      scope: nextScope,
    });
  };

  
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (initialQuery.trim()) {
      performSearch(initialQuery, initialScope);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  useEffect(() => {
    if (!hasInitialized.current) return;
    performSearch(debouncedQuery, scope);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <PageContent>
      <Card>
        <SearchBar value={input} onChange={setInput} />

        <SearchTabs
          scope={scope}
          onChange={(nextScope) => performSearch(input, nextScope)}
        />

        <SearchResults
          input={input}
          scope={scope}
          results={results}
          loading={loading}
          error={error}
        />
      </Card>
    </PageContent>
  );
};

export default ExplorePage;
