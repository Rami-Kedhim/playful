
import { supabase } from "@/integrations/supabase/client";
import { getMessagingSchema } from "./schemaDetection";

/**
 * Mark messages as read for a particular conversation.
 * 
 * @param userId The ID of the current user
 * @param otherUserId The ID of the other user in the conversation
 * @returns Promise<void>
 */
export const markMessagesAsRead = async (userId: string, otherUserId: string): Promise<void> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      await markDirectMessagesAsRead(userId, otherUserId);
    } else if (messagingSchema === 'conversation') {
      await markConversationMessagesAsRead(userId, otherUserId);
    }
  } catch (error) {
    console.error("Error marking messages as read:", error);
  }
};

/**
 * Mark direct messages as read.
 */
async function markDirectMessagesAsRead(userId: string, senderId: string): Promise<void> {
  try {
    const now = new Date().toISOString();
    
    // Mark all messages from the sender to the current user as read
    const { error } = await supabase
      .from('messages')
      .update({ read_at: now })
      .eq('sender_id', senderId)
      .eq('receiver_id', userId)
      .is('read_at', null);
    
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error("Error marking direct messages as read:", err);
  }
}

/**
 * Mark conversation messages as read.
 */
async function markConversationMessagesAsRead(userId: string, otherUserId: string): Promise<void> {
  try {
    // First, find the conversation between these users
    const { data: userConversations, error: userError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId);
    
    if (userError || !userConversations || userConversations.length === 0) {
      return;
    }
    
    const userConversationIds = userConversations.map(c => c.conversation_id);
    
    const { data: otherParticipants, error: otherError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', otherUserId)
      .in('conversation_id', userConversationIds);
    
    if (otherError || !otherParticipants || otherParticipants.length === 0) {
      return;
    }
    
    // Get the conversation ID
    const conversationId = otherParticipants[0].conversation_id;
    
    const now = new Date().toISOString();
    
    // Mark all messages in this conversation from the other user as read
    const { error } = await supabase
      .from('messages')
      .update({ read_at: now })
      .eq('conversation_id', conversationId)
      .eq('sender_id', otherUserId)
      .is('read_at', null);
    
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error("Error marking conversation messages as read:", err);
  }
}
