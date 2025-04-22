import { AIMessage, AIConversation } from "@/types/ai-conversation";
import { supabase } from "@/integrations/supabase/client";

const TABLE_NAME = "ai_messages";
const CONVERSATION_TABLE_NAME = "ai_conversations";

export const aiConversationsService = {
  /**
   * Fetches messages for a specific conversation.
   * @param conversationId - The ID of the conversation.
   * @returns A promise that resolves to an array of AIMessage objects.
   */
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

  /**
   * Sends a message to a conversation.
   * @param conversationId - The ID of the conversation.
   * @param message - The message content.
   * @param senderId - The ID of the sender.
   * @returns A promise that resolves to the created AIMessage object.
   */
  sendMessage: async (
    conversationId: string,
    message: string,
    senderId: string
  ): Promise<AIMessage | null> => {
    try {
      // Fix typing of status to union literals
      const exampleStatus: "pending" | "completed" | "failed" = "pending";

      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([
          {
            conversation_id: conversationId,
            content: message,
            sender_id: senderId,
            status: exampleStatus, // Use the literal type here
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

  /**
   * Updates the status of a message.
   * @param messageId - The ID of the message to update.
   * @param status - The new status of the message.
   * @returns A promise that resolves to true if the update was successful, false otherwise.
   */
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

  /**
   * Creates a new conversation.
   * @param participantIds - An array of participant IDs.
   * @returns A promise that resolves to the created AIConversation object.
   */
  createConversation: async (
    participantIds: string[]
  ): Promise<AIConversation | null> => {
    try {
      const { data, error } = await supabase
        .from(CONVERSATION_TABLE_NAME)
        .insert([
          {
            participant_ids: participantIds,
          },
        ])
        .select("*")
        .single();

      if (error) {
        console.error("Error creating conversation:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error creating conversation:", err);
      return null;
    }
  },

  /**
   * Fetches a conversation by ID.
   * @param conversationId - The ID of the conversation to fetch.
   * @returns A promise that resolves to the AIConversation object if found, null otherwise.
   */
  getConversation: async (
    conversationId: string
  ): Promise<AIConversation | null> => {
    try {
      const { data, error } = await supabase
        .from(CONVERSATION_TABLE_NAME)
        .select("*")
        .eq("id", conversationId)
        .single();

      if (error) {
        console.error("Error fetching conversation:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error fetching conversation:", err);
      return null;
    }
  },

  /**
   * Lists all conversations for a specific user ID.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to an array of AIConversation objects.
   */
  listConversations: async (userId: string): Promise<AIConversation[]> => {
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
