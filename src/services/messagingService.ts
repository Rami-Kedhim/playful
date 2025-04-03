
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

// Helper function to check if a column exists in a table - using a more reliable approach
async function checkColumnExists(tableName: string, columnName: string): Promise<boolean> {
  try {
    // Using information_schema to check if the column exists
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', tableName)
      .eq('column_name', columnName)
      .limit(1);
    
    if (error) {
      console.error("Error checking if column exists:", error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error(`Error checking if column ${columnName} exists in ${tableName}:`, error);
    return false;
  }
}

// Helper function to check if a table exists - using a more reliable approach
async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    // Using information_schema to check if the table exists
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', tableName)
      .eq('table_schema', 'public')
      .limit(1);
    
    if (error) {
      console.error("Error checking if table exists:", error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (err) {
    console.error(`Error checking if table ${tableName} exists:`, err);
    return false;
  }
}

// Fetch conversations for the current user
export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // First check if receiver_id column exists in messages
    const hasReceiverIdColumn = await checkColumnExists('messages', 'receiver_id');
    const hasConversationsTable = await checkTableExists('conversations');
    
    if (hasReceiverIdColumn) {
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
      
      if (!data || data.length === 0) return [];
      
      // Process the data to create a conversations list
      const conversationsMap = new Map<string, Conversation>();
      
      const messagesArray = safeGetData<any>(data);
      
      messagesArray.forEach(message => {
        try {
          // If there was a query error in the data, skip this message
          if (message.error) return;
          
          // For each message, determine the other user (conversation participant)
          const otherUserId = message.sender_id === userId ? message.receiver_id : message.sender_id;
          // Use a type assertion to access the profiles data safely
          const profileData = message.profiles as any;
          
          if (!conversationsMap.has(otherUserId)) {
            // Safely access properties that might not exist in an error case
            let profileName = "Unknown User";
            let profileAvatar = null;
            
            if (profileData && typeof profileData === 'object') {
              profileName = profileData.username || "Unknown User";
              profileAvatar = profileData.avatar_url;
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
    } else if (hasConversationsTable) {
      // Conversation-based model
      // Using a simpler query approach that's more compatible
      try {
        // First get all conversations this user is a part of
        const { data: userConversations, error: convError } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', userId);
          
        if (convError) throw convError;
        if (!userConversations || userConversations.length === 0) return [];
        
        const conversationIds = userConversations.map(c => c.conversation_id);
        
        // Then get all conversation participants for those conversations except the current user
        const { data: participants, error: partError } = await supabase
          .from('conversation_participants')
          .select(`
            conversation_id,
            user_id,
            profiles:user_id(id, username, avatar_url, is_content_creator, is_escort)
          `)
          .in('conversation_id', conversationIds)
          .neq('user_id', userId);
          
        if (partError) throw partError;
        if (!participants) return [];
        
        // Get the last message for each conversation
        const { data: lastMessages, error: msgError } = await supabase
          .from('messages')
          .select('*')
          .in('conversation_id', conversationIds)
          .order('created_at', { ascending: false });
          
        if (msgError) throw msgError;
        
        // Build the conversations with the data we have
        const conversations: Conversation[] = [];
        
        for (const participant of participants) {
          try {
            const conversationId = participant.conversation_id;
            // Find the last message for this conversation
            const lastMessage = lastMessages?.find(m => m.conversation_id === conversationId);
            
            if (!lastMessage) continue;
            
            // Get profile data safely - using type assertion to handle potential undefined
            const profileData = (participant.profiles || {}) as any;
            let profileName = "Unknown User";
            let profileAvatar = null;
            
            if (profileData) {
              profileName = profileData.username || "Unknown User";
              profileAvatar = profileData.avatar_url;
            }
            
            // Count unread messages
            const unreadCount = lastMessages
              ?.filter(m => 
                m.conversation_id === conversationId && 
                m.sender_id !== userId && 
                !m.read_at
              ).length || 0;
            
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
    // Check schema configuration
    const hasReceiverIdColumn = await checkColumnExists('messages', 'receiver_id');
    const hasConversationsTable = await checkTableExists('conversations');
    
    if (hasReceiverIdColumn) {
      // Direct messaging model
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order('created_at');
      
      if (error) throw error;
      
      if (!data) return [];
      
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
    } else if (hasConversationsTable) {
      // First find the conversation
      try {
        // Find conversations where both users are participants
        // We'll use a raw SQL approach since we can't use RPC functions with TypeScript typing
        const { data: commonConversationData, error: findError } = await supabase
          .rpc('find_common_conversation', {
            user1_id: userId,
            user2_id: otherUserId
          });
        
        if (findError || !commonConversationData || !Array.isArray(commonConversationData) || commonConversationData.length === 0) {
          // If no common conversation found
          return [];
        }
        
        const conversationId = commonConversationData[0].conversation_id;
        
        // Get the messages
        const { data, error: msgError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at');
        
        if (msgError) throw msgError;
        
        if (!data) return [];
        
        // Convert the data to match our Message interface
        const messages: Message[] = data.map(msg => ({
          id: msg.id,
          sender_id: msg.sender_id,
          // For the conversation model, we need to infer the receiver
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
    // Check schema to determine the correct insert method
    const hasReceiverIdColumn = await checkColumnExists('messages', 'receiver_id');
    const hasConversationsTable = await checkTableExists('conversations');
    
    if (hasReceiverIdColumn) {
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
    } else if (hasConversationsTable) {
      // First check if a conversation exists between these users
      let conversationId: string | null = null;
      
      try {
        // Find common conversation using RPC function
        const { data: commonConversationData, error: findError } = await supabase
          .rpc('find_common_conversation', {
            user1_id: senderId,
            user2_id: receiverId
          });
        
        if (!findError && commonConversationData && Array.isArray(commonConversationData) && commonConversationData.length > 0) {
          conversationId = commonConversationData[0].conversation_id;
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
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: senderId,
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
        receiver_id: receiverId, // Inferred for conversation model
        content: data.content,
        created_at: data.created_at,
        read: false
      };
      
      return message;
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
    // Check schema to determine the correct update method
    const hasReceiverIdColumn = await checkColumnExists('messages', 'receiver_id');
    const hasConversationsTable = await checkTableExists('conversations');
    
    if (hasReceiverIdColumn) {
      // Direct message model
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('receiver_id', userId)
        .eq('sender_id', senderId)
        .is('read_at', null);
      
      if (error) throw error;
    } else if (hasConversationsTable) {
      try {
        // Find common conversation using RPC function
        const { data: commonConversationData, error: findError } = await supabase
          .rpc('find_common_conversation', {
            user1_id: userId,
            user2_id: senderId
          });
        
        if (findError) throw findError;
        
        if (commonConversationData && Array.isArray(commonConversationData) && commonConversationData.length > 0) {
          const conversationId = commonConversationData[0].conversation_id;
          
          // Update messages as read
          const { error } = await supabase
            .from('messages')
            .update({ read_at: new Date().toISOString() })
            .eq('conversation_id', conversationId)
            .eq('sender_id', senderId)
            .is('read_at', null);
          
          if (error) throw error;
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
  let channelSetup: any = null;
  
  // Check if we need to use conversations model instead
  checkColumnExists('messages', 'receiver_id').then(hasReceiverIdColumn => {
    let channel;
    
    if (hasReceiverIdColumn) {
      // Direct messaging model
      channel = supabase
        .channel('direct_messages')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        }, (payload) => {
          const newMessage = payload.new as any;
          
          callback({
            id: newMessage.id,
            sender_id: newMessage.sender_id,
            receiver_id: newMessage.receiver_id,
            content: newMessage.content,
            created_at: newMessage.created_at,
            read: newMessage.read_at !== null
          });
        })
        .subscribe();
    } else {
      // Conversations model - need to listen for all new messages
      // and filter client-side
      checkTableExists('conversations').then(hasConversationsTable => {
        if (hasConversationsTable) {
          // First get all conversations this user is a part of
          supabase
            .from('conversation_participants')
            .select('conversation_id')
            .eq('user_id', userId)
            .then(({ data }) => {
              if (!data || data.length === 0) return;
              
              const conversationIds = data.map(c => c.conversation_id);
              
              // Subscribe to messages in these conversations
              channel = supabase
                .channel('conversation_messages')
                .on('postgres_changes', {
                  event: 'INSERT',
                  schema: 'public',
                  table: 'messages',
                  filter: `conversation_id=in.(${conversationIds.join(',')})`
                }, (payload) => {
                  const newMessage = payload.new as any;
                  
                  // Only notify about messages not sent by the current user
                  if (newMessage.sender_id !== userId) {
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
    }
    
    channelSetup = channel;
  });
  
  // Return an object with an unsubscribe method
  return {
    unsubscribe: () => {
      if (channelSetup) {
        supabase.removeChannel(channelSetup);
      }
      console.log("Unsubscribed from messages channel");
    }
  };
};
