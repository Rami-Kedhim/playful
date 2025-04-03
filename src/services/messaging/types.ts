
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

// For the useContentFilters issue
export interface ContentFilters {
  status: "published" | "draft" | "scheduled" | undefined;
  searchQuery?: string;
  contentType?: string;
  sort?: "newest" | "oldest" | "title_asc" | "title_desc" | "most_viewed" | "least_viewed";
}
