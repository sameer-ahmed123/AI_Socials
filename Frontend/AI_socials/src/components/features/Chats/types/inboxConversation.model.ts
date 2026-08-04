export interface InboxUser {
  id: number;
  username: string;
  display_name: string;
  avatar: string;
}

export interface InboxConversation {
  id: number;

  other_user: InboxUser;

  last_message: {
    content: string;
    sender: string;
  } | null;

  last_message_at: string | null;
}
