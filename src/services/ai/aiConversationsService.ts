
// Fixed import for types; use AIMessage only for now until AIConversation type is added.

import { AIMessage } from '@/types/ai-profile'; 
import { supabase } from "@/integrations/supabase/client";

const TABLE_NAME = "ai_messages";
const CONVERSATION_TABLE_NAME = "ai_conversations";

export const aiConversationsService = {
  getMessages: async (conversationId: string): Promise<AIMessage[]> => {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error("Unexpected error fetching messages:", err);
      return [];
    }
  },

  sendMessage: async (
    conversationId: string,
    message: string,
    senderId: string
  ): Promise<AIMessage | null> => {
    try {
      type Status = "pending" | "completed" | "failed";
      const status: Status = "pending";

      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([
          {
            conversation_id: conversationId,
            content: message,
            sender_id: senderId,
            status: status,
          },
        ])
        .select("*")
        .single();

      if (error) {
        console.error("Error sending message:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error sending message:", err);
      return null;
    }
  },

  updateMessageStatus: async (
    messageId: string,
    status: "pending" | "completed" | "failed"
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .update({ status })
        .eq("id", messageId);

      if (error) {
        console.error("Error updating message status:", error);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Unexpected error updating message status:", err);
      return false;
    }
  },

  createConversation: async (
    participantIds: string[]
  ): Promise<null> => {
    // Temporarily not implemented because AIConversation type unknown
    return null;
  },

  getConversation: async (
    conversationId: string
  ): Promise<null> => {
    // Temporarily not implemented because AIConversation type unknown
    return null;
  },

  listConversations: async (userId: string): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from(CONVERSATION_TABLE_NAME)
        .select("*")
        .contains("participant_ids", [userId]);

      if (error) {
        console.error("Error listing conversations:", error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error("Unexpected error listing conversations:", err);
      return [];
    }
  },
};

