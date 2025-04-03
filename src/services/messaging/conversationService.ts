
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { getMessagingSchema } from "./schemaDetection";
import { Conversation } from "./types";

/**
 * Fetch the list of conversations for a user
 */
export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      return await fetchDirectConversations(userId);
    } else if (messagingSchema === 'conversation') {
      return await fetchConversationSchema(userId);
    } else {
      console.error("No compatible messaging schema found");
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching conversations:", error.message);
    toast({
      title: "Failed to load conversations",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

/**
 * Fetch conversations from direct messages schema
 */
async function fetchDirectConversations(userId: string): Promise<Conversation[]> {
  try {
    // First get all the unique user IDs that the current user has exchanged messages with
    const { data: messagePartners, error: partnerError } = await supabase
      .from('messages')
      .select('sender_id, receiver_id')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (partnerError) throw partnerError;
    
    if (!messagePartners || messagePartners.length === 0) {
      return [];
    }
    
    // Extract unique user IDs that are not the current user
    const uniquePartnerIds = new Set<string>();
    messagePartners.forEach(msg => {
      if (msg && msg.sender_id !== userId) {
        uniquePartnerIds.add(msg.sender_id);
      }
      if (msg && msg.receiver_id !== userId) {
        uniquePartnerIds.add(msg.receiver_id);
      }
    });
    
    // Now fetch the last message for each conversation
    const conversations: Conversation[] = [];
    
    for (const partnerId of uniquePartnerIds) {
      // Get the last message between these users
      const { data: lastMessage, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (msgError) {
        console.error(`Error fetching last message with ${partnerId}:`, msgError);
        continue;
      }
      
      if (!lastMessage) continue;
      
      // Get unread count
      const { count: unreadCount, error: countError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('sender_id', partnerId)
        .eq('receiver_id', userId)
        .is('read_at', null);
      
      if (countError) {
        console.error(`Error counting unread messages from ${partnerId}:`, countError);
        continue;
      }
      
      // Get user details
      const { data: partnerProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, is_escort, is_content_creator')
        .eq('id', partnerId)
        .single();
      
      if (profileError) {
        console.error(`Error fetching profile for ${partnerId}:`, profileError);
        continue;
      }
      
      if (!partnerProfile) continue;
      
      // Determine partner type
      let partnerType: "creator" | "escort" | "user" = "user";
      if (partnerProfile.is_content_creator) {
        partnerType = "creator";
      } else if (partnerProfile.is_escort) {
        partnerType = "escort";
      }
      
      // Add to conversations array
      conversations.push({
        id: partnerId, // In direct message model, we use the partner ID as the conversation ID
        last_message: lastMessage.content,
        last_message_time: lastMessage.created_at,
        unread_count: unreadCount || 0,
        participant: {
          id: partnerId,
          name: partnerProfile.username || 'Anonymous User',
          avatar_url: partnerProfile.avatar_url,
          type: partnerType
        }
      });
    }
    
    // Sort by last message time, newest first
    return conversations.sort((a, b) => 
      new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime()
    );
  } catch (err) {
    console.error("Error in fetchDirectConversations:", err);
    return [];
  }
}

/**
 * Fetch conversations from the conversation schema
 */
async function fetchConversationSchema(userId: string): Promise<Conversation[]> {
  try {
    // Get all conversations the user is part of
    const { data: userConversations, error: convError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId);
      
    if (convError) throw convError;
    if (!userConversations || userConversations.length === 0) {
      return [];
    }
    
    const conversationIds = userConversations.map(c => c.conversation_id);
    
    // For each conversation, get the last message and other participant
    const conversations: Conversation[] = [];
    
    for (const conversationId of conversationIds) {
      // Get other participants in this conversation
      const { data: participants, error: partError } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', conversationId)
        .neq('user_id', userId);
        
      if (partError) {
        console.error(`Error fetching participants for conversation ${conversationId}:`, partError);
        continue;
      }
      
      if (!participants || participants.length === 0) continue;
      
      // For simplicity, we'll just use the first other participant (most conversations will be 1:1)
      const partnerId = participants[0].user_id;
      
      // Get last message
      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (msgError) {
        console.error(`Error fetching messages for conversation ${conversationId}:`, msgError);
        continue;
      }
      
      if (!messages || messages.length === 0) continue;
      
      const lastMessage = messages[0];
      
      // Get unread count
      const { count: unreadCount, error: countError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', userId)
        .is('read_at', null);
        
      if (countError) {
        console.error(`Error counting unread messages for conversation ${conversationId}:`, countError);
        continue;
      }
      
      // Get partner profile
      const { data: partnerProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, is_escort, is_content_creator')
        .eq('id', partnerId)
        .single();
        
      if (profileError) {
        console.error(`Error fetching profile for ${partnerId}:`, profileError);
        continue;
      }
      
      if (!partnerProfile) continue;
      
      // Determine partner type
      let partnerType: "creator" | "escort" | "user" = "user";
      if (partnerProfile.is_content_creator) {
        partnerType = "creator";
      } else if (partnerProfile.is_escort) {
        partnerType = "escort";
      }
      
      // Add to conversations array
      conversations.push({
        id: conversationId,
        last_message: lastMessage.content,
        last_message_time: lastMessage.created_at,
        unread_count: unreadCount || 0,
        participant: {
          id: partnerId,
          name: partnerProfile.username || 'Anonymous User',
          avatar_url: partnerProfile.avatar_url,
          type: partnerType
        }
      });
    }
    
    // Sort by last message time, newest first
    return conversations.sort((a, b) => 
      new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime()
    );
  } catch (err) {
    console.error("Error in fetchConversationSchema:", err);
    return [];
  }
}
