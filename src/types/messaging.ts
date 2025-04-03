
// Import from profile directly to avoid circular references
export interface Profile {
  id: string;
  username?: string;
  avatar_url?: string;
  full_name?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  metadata?: any;
  status?: string;
  sender?: Profile | null;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  participants?: { user_id: string }[];
  messages?: Message[];
  otherParticipant?: Profile | null;
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  created_at: string;
}
