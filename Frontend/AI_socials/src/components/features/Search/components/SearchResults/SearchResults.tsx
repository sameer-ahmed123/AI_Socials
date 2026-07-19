import EmptyState from "../../../../ui/EmptyState/EmptyState";
import LoadingScreen from "../../../../common/loadingScreen/LoadingScreen";

import SearchPostResults from "./posts/SearchPostResults";
import SearchUserResults from "./users/SearchUserResults";
import SearchHashtagResults from "./hashtags/SearchHashtagResults";

import type { Post } from "../../../../../models/Post.model";
import type { SearchUser } from "../../types/SearchUser.model";
import type { SearchHashtag } from "../../types/SearchHashtag.model";

import type { SearchResultsProps } from "./SearchResults.types";

const SearchResults = ({
  loading,
  error,
  scope,
  results,
  input,
}: SearchResultsProps) => {
  const trimmedQuery = input.trim();
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <EmptyState title="Search failed" description={error} />;
  }
  if (!trimmedQuery) {
    return (
      <EmptyState
        title="Search SketchX"
        description="Start typing to search posts, people and hashtags."
      />
    );
  }

  if (!results.length) {
    const labels = {
      posts: "posts",
      users: "users",
      hashtags: "hashtags",
    };

    return (
      <EmptyState
        title={`No ${labels[scope]} found`}
        description={`No ${labels[scope]} matched "${trimmedQuery}".`}
      />
    );
  }

  switch (scope) {
    case "posts":
      return <SearchPostResults posts={results as Post[]} />;

    case "users":
      return <SearchUserResults users={results as SearchUser[]} />;

    case "hashtags":
      return <SearchHashtagResults hashtags={results as SearchHashtag[]} />;

    default:
      return null;
  }
};

export default SearchResults;
