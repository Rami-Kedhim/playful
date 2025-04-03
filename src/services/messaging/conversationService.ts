
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { getMessagingSchema } from "./schemaDetection";
import { determineUserType, safeGet } from "./utils";
import { Conversation } from "./types";

export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    console.log("Detected messaging schema:", messagingSchema);
    
    if (messagingSchema === 'direct') {
      return await fetchDirectConversations(userId);
    } else if (messagingSchema === 'conversation') {
      return await fetchConversationBasedConversations(userId);
    } else {
      // No compatible messaging schema found
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

async function fetchDirectConversations(userId: string): Promise<Conversation[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        content,
        created_at,
        sender_id,
        read_at,
        receiver_id,
        profiles!sender_id(id, username, avatar_url, is_content_creator, is_escort)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    if (!data || !Array.isArray(data) || data.length === 0) return [];
    
    // Process the data to create a conversations list
    const conversationsMap = new Map<string, Conversation>();
    
    data.forEach(message => {
      try {
        // For each message, determine the other user (conversation participant)
        const otherUserId = message.sender_id === userId ? message.receiver_id : message.sender_id;
        
        // Check if profiles data exists and has the required properties
        const profileData = message.profiles || {};
        
        if (!conversationsMap.has(otherUserId)) {
          // Safely access profile properties with fallbacks
          const profileName = safeGet(profileData, 'username', "Unknown User");
          const profileAvatar = safeGet(profileData, 'avatar_url', null);
          
          conversationsMap.set(otherUserId, {
            id: otherUserId,
            last_message: message.content || "",
            last_message_time: message.created_at || new Date().toISOString(),
            unread_count: (message.sender_id !== userId && !message.read_at) ? 1 : 0,
            participant: {
              id: otherUserId,
              name: profileName,
              avatar_url: profileAvatar,
              type: determineUserType(profileData)
            }
          });
        }
      } catch (err) {
        console.error("Error processing message:", err);
      }
    });
    
    return Array.from(conversationsMap.values());
  } catch (err) {
    console.error("Error in direct conversations:", err);
    return [];
  }
}

async function fetchConversationBasedConversations(userId: string): Promise<Conversation[]> {
  try {
    // First get all conversations this user is a part of
    const { data: userConversations, error: convError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId);
      
    if (convError || !userConversations || userConversations.length === 0) {
      return [];
    }
    
    const conversationIds = userConversations.map(c => c.conversation_id);
    
    // Then get all conversation participants for those conversations except the current user
    const { data: participants, error: partError } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id,
        user_id,
        profiles(id, username, avatar_url, is_content_creator, is_escort)
      `)
      .in('conversation_id', conversationIds)
      .neq('user_id', userId);
      
    if (partError || !participants) return [];
    
    // Get the last message for each conversation
    const { data: lastMessages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .in('conversation_id', conversationIds)
      .order('created_at', { ascending: false });
      
    if (msgError) return [];
    
    // Build the conversations with the data we have
    const conversations: Conversation[] = [];
    
    for (const participant of participants) {
      try {
        const conversationId = participant.conversation_id;
        // Find the last message for this conversation
        const lastMessage = Array.isArray(lastMessages) ? 
          lastMessages.find(m => m.conversation_id === conversationId) : null;
        
        if (!lastMessage) continue;
        
        // Get profile data safely
        const profileData = participant.profiles || {};
        const profileName = safeGet(profileData, 'username', "Unknown User");
        const profileAvatar = safeGet(profileData, 'avatar_url', null);
        
        // Count unread messages
        const unreadCount = Array.isArray(lastMessages) ? 
          lastMessages.filter(m => 
            m.conversation_id === conversationId && 
            m.sender_id !== userId && 
            !m.read_at
          ).length : 0;
        
        conversations.push({
          id: conversationId,
          last_message: lastMessage.content || "",
          last_message_time: lastMessage.created_at || new Date().toISOString(),
          unread_count: unreadCount,
          participant: {
            id: participant.user_id,
            name: profileName,
            avatar_url: profileAvatar,
            type: determineUserType(profileData)
          }
        });
      } catch (err) {
        console.error("Error building conversation:", err);
      }
    }
    
    return conversations;
  } catch (error) {
    console.error("Error in conversation-based model:", error);
    return [];
  }
}
