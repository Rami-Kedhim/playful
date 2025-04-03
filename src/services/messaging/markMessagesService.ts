
import { supabase } from "@/integrations/supabase/client";
import { getMessagingSchema } from "./schemaDetection";

export const markMessagesAsRead = async (userId: string, senderId: string): Promise<void> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      await markDirectMessagesAsRead(userId, senderId);
    } else if (messagingSchema === 'conversation') {
      await markConversationMessagesAsRead(userId, senderId);
    }
  } catch (error: any) {
    console.error("Error marking messages as read:", error.message);
  }
};

async function markDirectMessagesAsRead(userId: string, senderId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('receiver_id', userId)
      .eq('sender_id', senderId)
      .is('read_at', null);
    
    if (error) throw error;
  } catch (err) {
    console.error("Error marking direct messages as read:", err);
  }
}

async function markConversationMessagesAsRead(userId: string, senderId: string): Promise<void> {
  try {
    // Find the common conversation
    const { data: userConversations, error: userError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId);
      
    if (userError || !Array.isArray(userConversations) || userConversations.length === 0) {
      return;
    }
    
    const userConversationIds = userConversations.map(c => c.conversation_id);
    
    // Find conversations where the sender is also a participant
    const { data: senderParticipants, error: senderError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', senderId)
      .in('conversation_id', userConversationIds);
      
    if (senderError || !Array.isArray(senderParticipants) || senderParticipants.length === 0) {
      return;
    }
    
    // Update messages for all common conversations
    for (const participant of senderParticipants) {
      const conversationId = participant.conversation_id;
      
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .eq('sender_id', senderId)
        .is('read_at', null);
        
      if (error) console.error("Error marking messages as read:", error);
    }
  } catch (err) {
    console.error("Error marking conversation messages as read:", err);
  }
}
