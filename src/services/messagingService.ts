
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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

// Helper function to determine user type
const determineUserType = (profileData: any): "creator" | "escort" | "user" => {
  if (!profileData) return "user";
  if (profileData.is_content_creator) return "creator";
  if (profileData.is_escort) return "escort";
  return "user";
};

// Helper to safely get data from query results that might have errors
const safeGetData = <T>(result: any): T[] => {
  if (result && !result.error && Array.isArray(result.data)) {
    return result.data as T[];
  }
  return [];
};

// Simplified approach to check messaging schema
const getMessagingSchema = async (): Promise<'direct' | 'conversation' | 'none'> => {
  try {
    // Check if messages table exists at all
    try {
      const { data: messagesExist, error: messagesError } = await supabase
        .from('messages')
        .select('id')
        .limit(1);
        
      if (messagesError) {
        console.log("Messages table doesn't exist or is inaccessible:", messagesError);
        return 'none';
      }
    } catch (err) {
      console.log("Error checking messages table:", err);
      return 'none';
    }
    
    // Try to query a field that would only exist in direct messaging
    try {
      const { data: receiverTest, error: receiverError } = await supabase
        .from('messages')
        .select('receiver_id')
        .limit(1);
      
      if (!receiverError) {
        // If we can select receiver_id without error, it's direct messaging
        return 'direct';
      }
    } catch (err) {
      // This error is expected if using conversation model
      console.log("Receiver_id field doesn't exist, likely using conversation model");
    }
    
    // Check conversation-based (conversations and participants tables)
    try {
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('id')
        .limit(1);
      
      if (!convError && convData !== null) {
        return 'conversation';
      }
    } catch (err) {
      console.log("Error checking conversations table:", err);
    }
    
    return 'none';
  } catch (err) {
    console.error("Error detecting messaging schema:", err);
    return 'none';
  }
};

// Fetch conversations for the current user
export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    console.log("Detected messaging schema:", messagingSchema);
    
    if (messagingSchema === 'direct') {
      // Direct messaging model
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
            let profileName = "Unknown User";
            let profileAvatar = null;
            
            if (profileData && typeof profileData === 'object') {
              profileName = profileData.username || "Unknown User";
              profileAvatar = profileData.avatar_url || null;
            }
            
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
    } else if (messagingSchema === 'conversation') {
      // Conversation-based model
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
            let profileName = "Unknown User";
            let profileAvatar = null;
            
            if (profileData && typeof profileData === 'object') {
              profileName = profileData.username || "Unknown User";
              profileAvatar = profileData.avatar_url || null;
            }
            
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

// Fetch messages for a specific conversation
export const fetchMessages = async (userId: string, otherUserId: string): Promise<Message[]> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      // Direct messaging model
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order('created_at');
      
      if (error) throw error;
      
      if (!data || !Array.isArray(data)) return [];
      
      // Convert the data to match our Message interface
      const messages: Message[] = data.map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        receiver_id: msg.receiver_id,
        content: msg.content,
        created_at: msg.created_at,
        read: msg.read_at !== null
      }));
      
      return messages;
    } else if (messagingSchema === 'conversation') {
      // Find conversations that both users are part of
      try {
        // First find conversations the current user is part of
        const { data: userConversations, error: userError } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', userId);
          
        if (userError || !Array.isArray(userConversations) || userConversations.length === 0) {
          return [];
        }
        
        const userConversationIds = userConversations.map(c => c.conversation_id);
        
        // Now find which of those conversations the other user is also part of
        const { data: otherParticipants, error: otherError } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', otherUserId)
          .in('conversation_id', userConversationIds);
          
        if (otherError || !Array.isArray(otherParticipants) || otherParticipants.length === 0) {
          return [];
        }
        
        // Find the common conversation (typically there should be just one)
        const commonConversation = otherParticipants[0];
        
        if (!commonConversation) {
          return [];
        }
        
        const conversationId = commonConversation.conversation_id;
        
        // Get the messages
        const { data, error: msgError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at');
          
        if (msgError || !Array.isArray(data)) {
          return [];
        }
        
        // Convert the data to match our Message interface - for conversation model,
        // we need to infer the receiver_id as it's not stored in the messages table
        const messages: Message[] = data.map(msg => ({
          id: msg.id,
          sender_id: msg.sender_id,
          // For the conversation model, infer the receiver
          receiver_id: msg.sender_id === userId ? otherUserId : userId,
          content: msg.content,
          created_at: msg.created_at,
          read: msg.read_at !== null
        }));
        
        return messages;
      } catch (err) {
        console.error("Error fetching conversation messages:", err);
        return [];
      }
    } else {
      // No compatible messaging schema found
      console.error("No compatible messaging schema found");
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching messages:", error.message);
    toast({
      title: "Failed to load messages",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

// Send a new message
export const sendMessage = async (senderId: string, receiverId: string, content: string): Promise<Message | null> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      // Direct message model
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          content
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (!data) throw new Error("Failed to send message");
      
      // Convert the response to match our Message interface
      const message: Message = {
        id: data.id,
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        content: data.content,
        created_at: data.created_at,
        read: false
      };
      
      return message;
    } else if (messagingSchema === 'conversation') {
      // First check if a conversation exists between these users
      let conversationId: string | null = null;
      
      // Find conversations that both users are part of
      try {
        // First find conversations the current user is part of
        const { data: userConversations, error: userError } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', senderId);
          
        if (!userError && Array.isArray(userConversations) && userConversations.length > 0) {
          const userConversationIds = userConversations.map(c => c.conversation_id);
          
          // Now find which of those conversations the other user is also part of
          const { data: otherParticipants, error: otherError } = await supabase
            .from('conversation_participants')
            .select('conversation_id')
            .eq('user_id', receiverId)
            .in('conversation_id', userConversationIds);
            
          if (!otherError && Array.isArray(otherParticipants) && otherParticipants.length > 0) {
            // Use the first common conversation
            conversationId = otherParticipants[0].conversation_id;
          }
        }
      } catch (e) {
        console.error("Error finding conversation:", e);
      }
      
      // If no conversation exists, create one
      if (!conversationId) {
        const { data: newConv, error: newConvError } = await supabase
          .from('conversations')
          .insert({})
          .select()
          .single();
        
        if (newConvError) throw newConvError;
        
        if (!newConv) throw new Error("Failed to create conversation");
        
        conversationId = newConv.id;
        
        // Add participants
        const participantsData = [
          { conversation_id: conversationId, user_id: senderId },
          { conversation_id: conversationId, user_id: receiverId }
        ];
        
        const { error: participantsError } = await supabase
          .from('conversation_participants')
          .insert(participantsData);
        
        if (participantsError) throw participantsError;
      }
      
      // Now insert the message
      const message = {
        conversation_id: conversationId,
        sender_id: senderId,
        content
      };
      
      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single();
      
      if (error) throw error;
      
      if (!data) throw new Error("Failed to send message");
      
      // For the conversation model, we need to construct the full Message object
      const result: Message = {
        id: data.id,
        sender_id: data.sender_id,
        // The receiver_id is inferred for the conversation model
        receiver_id: receiverId,
        content: data.content,
        created_at: data.created_at,
        read: false
      };
      
      return result;
    } else {
      throw new Error("No compatible messaging schema found");
    }
  } catch (error: any) {
    console.error("Error sending message:", error.message);
    toast({
      title: "Failed to send message",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

// Mark messages as read
export const markMessagesAsRead = async (userId: string, senderId: string): Promise<void> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      // Direct message model
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('receiver_id', userId)
        .eq('sender_id', senderId)
        .is('read_at', null);
      
      if (error) throw error;
    } else if (messagingSchema === 'conversation') {
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
        console.error("Error marking messages as read:", err);
      }
    }
  } catch (error: any) {
    console.error("Error marking messages as read:", error.message);
  }
};

// Subscribe to new messages for the current user
export const subscribeToMessages = (userId: string, callback: (message: Message) => void) => {
  const subscriber = {
    channel: null as any,
    unsubscribe: () => {
      if (subscriber.channel) {
        supabase.removeChannel(subscriber.channel);
        console.log("Unsubscribed from messages channel");
      }
    }
  };
  
  // Check messaging model
  getMessagingSchema().then(messagingSchema => {
    if (messagingSchema === 'direct') {
      // Direct messaging model
      subscriber.channel = supabase
        .channel('direct_messages')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        }, (payload) => {
          const newMessage = payload.new as any;
          
          if (newMessage) {
            callback({
              id: newMessage.id,
              sender_id: newMessage.sender_id,
              receiver_id: newMessage.receiver_id,
              content: newMessage.content,
              created_at: newMessage.created_at,
              read: newMessage.read_at !== null
            });
          }
        })
        .subscribe();
    } else if (messagingSchema === 'conversation') {
      // First get all conversations this user is a part of
      supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId)
        .then(({ data }) => {
          if (!data || data.length === 0) return;
          
          const conversationIds = data.map(c => c.conversation_id);
          
          // Subscribe to messages in these conversations
          subscriber.channel = supabase
            .channel('conversation_messages')
            .on('postgres_changes', {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `conversation_id=in.(${conversationIds.join(',')})`
            }, (payload) => {
              const newMessage = payload.new as any;
              
              // Only notify about messages not sent by the current user
              if (newMessage && newMessage.sender_id !== userId) {
                callback({
                  id: newMessage.id,
                  sender_id: newMessage.sender_id,
                  receiver_id: userId, // Inferred as the current user
                  content: newMessage.content,
                  created_at: newMessage.created_at,
                  read: newMessage.read_at !== null
                });
              }
            })
            .subscribe();
        });
    }
  });
  
  return subscriber;
};
