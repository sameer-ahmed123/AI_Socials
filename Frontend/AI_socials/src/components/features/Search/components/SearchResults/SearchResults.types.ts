import type { Post } from "../../../../../models/Post.model";
import type { SearchUser } from "../../types/SearchUser.model";
import type { SearchHashtag } from "../../types/SearchHashtag.model";
import type { SearchScope } from "../../hooks";

export interface SearchResultsProps {
  loading: boolean;
  input: string;
  error: string | null;
  scope: SearchScope;
  results: Post[] | SearchUser[] | SearchHashtag[];
}
