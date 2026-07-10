export interface SuggestedUser {
  id: string;

  name: string;

  username: string;

  followed: boolean;
  color:"yellow" | "blue" | "green" | "red" | "purple" | "gray";
}
