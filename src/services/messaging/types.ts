
import { Json } from "@/integrations/supabase/types";

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  participant: {
    id: string;
    name: string;
    avatar_url: string | null;
    type: "creator" | "escort" | "user";
  };
}

export type MessagingSchema = 'direct' | 'conversation' | 'none';

// Updated ContentFilters to match the hooks/content/types.ts format
export interface ContentFilters {
  status: "published" | "draft" | "scheduled" | undefined;
  searchQuery: string;  // Changed from optional to required to match the format in types.ts
  contentType?: string;
  sort?: "newest" | "oldest" | "title_asc" | "title_desc" | "most_viewed" | "least_viewed";
}
