import type { SearchUser } from "../../../types/SearchUser.model";

import UserSearchCard from "../../UserSearchCard/UserSearchCard";

interface SearchUserResultsProps {
  users: SearchUser[];
}

const SearchUserResults = ({ users }: SearchUserResultsProps) => {
  return (
    <>
      {users.map((user) => (
        <UserSearchCard key={user.id} user={user} />
      ))}
    </>
  );
};

export default SearchUserResults;
