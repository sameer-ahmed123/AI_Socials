export interface MessageSender {
  id: number;
  username: string;
  display_name: string;
  avatar: string;
}

export interface Message {
  id: number;
  sender: MessageSender;
  content: string;
  created_at: string;
  optimistic?: boolean;
}
