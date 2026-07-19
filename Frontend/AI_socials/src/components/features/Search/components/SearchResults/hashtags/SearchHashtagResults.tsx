import type { SearchHashtag } from "../../../types/SearchHashtag.model";

import HashtagSearchCard from "../../HashtagSearchCard/HashtagSearchCard";

interface SearchHashtagResultsProps {
  hashtags: SearchHashtag[];
}

const SearchHashtagResults = ({ hashtags }: SearchHashtagResultsProps) => {
  return (
    <>
      {hashtags.map((hashtag) => (
        <HashtagSearchCard key={hashtag.tag} hashtag={hashtag} />
      ))}
    </>
  );
};

export default SearchHashtagResults;
