
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

// Fetch conversations for the current user
export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // Query for messages table schema
    const { data: schema, error: schemaError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);
      
    if (schemaError) {
      console.error("Error checking messages schema:", schemaError);
      throw schemaError;
    }
    
    // Use the appropriate query based on schema
    const hasReceiverIdColumn = schema && schema.length > 0 && 'receiver_id' in schema[0];
    
    // If receiver_id exists, use direct query
    if (hasReceiverIdColumn) {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          read_at,
          receiver_id,
          profiles:sender_id(id, username, avatar_url, is_content_creator, is_escort)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Process the data to create a conversations list
      const conversationsMap = new Map<string, Conversation>();
      
      if (data) {
        data.forEach(message => {
          // For each message, determine the other user (conversation participant)
          const otherUserId = message.sender_id === userId ? message.receiver_id : message.sender_id;
          const profileData = message.profiles;
          
          if (!conversationsMap.has(otherUserId)) {
            conversationsMap.set(otherUserId, {
              id: otherUserId,
              last_message: message.content,
              last_message_time: message.created_at,
              unread_count: (message.sender_id !== userId && !message.read_at) ? 1 : 0,
              participant: {
                id: otherUserId,
                name: profileData?.username || 'Unknown User',
                avatar_url: profileData?.avatar_url,
                type: determineUserType(profileData)
              }
            });
          }
        });
      }
      
      return Array.from(conversationsMap.values());
    } else {
      // Fallback to use conversations table if receiver_id doesn't exist
      // This assumes a different schema structure
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          messages(content, created_at, sender_id, read_at),
          participants:conversation_participants(user_id, profiles:user_id(id, username, avatar_url, is_content_creator, is_escort))
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Process conversations data
      const conversations: Conversation[] = [];
      
      if (data) {
        data.forEach(conv => {
          // Find the other participant (not the current user)
          const otherParticipant = conv.participants.find(p => p.user_id !== userId);
          if (!otherParticipant) return;
          
          const lastMessage = conv.messages && conv.messages.length > 0 ? conv.messages[0] : null;
          if (!lastMessage) return;
          
          const profileData = otherParticipant.profiles;
          
          conversations.push({
            id: otherParticipant.user_id,
            last_message: lastMessage.content,
            last_message_time: lastMessage.created_at,
            unread_count: (lastMessage.sender_id !== userId && !lastMessage.read_at) ? 1 : 0,
            participant: {
              id: otherParticipant.user_id,
              name: profileData?.username || 'Unknown User',
              avatar_url: profileData?.avatar_url,
              type: determineUserType(profileData)
            }
          });
        });
      }
      
      return conversations;
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
    // Check if the messages table has receiver_id
    const { data: schema, error: schemaError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);
      
    if (schemaError) throw schemaError;
    
    const hasReceiverIdColumn = schema && schema.length > 0 && 'receiver_id' in schema[0];
    
    if (hasReceiverIdColumn) {
      // Direct query using sender_id and receiver_id
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order('created_at');
        
      if (error) throw error;
      
      // Convert the data to match our Message interface
      const messages: Message[] = data?.map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        receiver_id: msg.receiver_id,
        content: msg.content,
        created_at: msg.created_at,
        read: msg.read_at !== null
      })) || [];
      
      return messages;
    } else {
      // Fallback to use conversation_id if available
      const { data: convData, error: convError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .or(`and(user_id.eq.${userId}),and(user_id.eq.${otherUserId})`)
        .limit(1);
        
      if (convError) throw convError;
      
      if (!convData || convData.length === 0) {
        return [];
      }
      
      const conversationId = convData[0].conversation_id;
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at');
        
      if (error) throw error;
      
      // Convert the data to match our Message interface
      // Assume receiver_id is the other user if not present in schema
      const messages: Message[] = data?.map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        receiver_id: msg.sender_id === userId ? otherUserId : userId, // inferred
        content: msg.content,
        created_at: msg.created_at,
        read: msg.read_at !== null
      })) || [];
      
      return messages;
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
    // Check if the messages table has receiver_id
    const { data: schema, error: schemaError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);
      
    if (schemaError) throw schemaError;
    
    const hasReceiverIdColumn = schema && schema.length > 0 && 'receiver_id' in schema[0];
    
    if (hasReceiverIdColumn) {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          content,
          read_at: null
        })
        .select()
        .single();
        
      if (error) throw error;
      
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
    } else {
      // First, check if a conversation exists between the users
      const { data: convData, error: convError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .or(`and(user_id.eq.${senderId}),and(user_id.eq.${receiverId})`)
        .limit(1);
        
      if (convError) throw convError;
      
      let conversationId;
      
      if (!convData || convData.length === 0) {
        // Create a new conversation if none exists
        const { data: newConv, error: newConvError } = await supabase
          .from('conversations')
          .insert({})
          .select()
          .single();
          
        if (newConvError) throw newConvError;
        
        conversationId = newConv.id;
        
        // Add participants
        await supabase
          .from('conversation_participants')
          .insert([
            { conversation_id: conversationId, user_id: senderId },
            { conversation_id: conversationId, user_id: receiverId }
          ]);
      } else {
        conversationId = convData[0].conversation_id;
      }
      
      // Insert the message
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
      
      // Convert the response to match our Message interface
      const message: Message = {
        id: data.id,
        sender_id: data.sender_id,
        receiver_id: receiverId, // inferred
        content: data.content,
        created_at: data.created_at,
        read: false
      };
      
      return message;
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
    // Check if the messages table has read_at
    const { data: schema, error: schemaError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);
      
    if (schemaError) throw schemaError;
    
    const hasReadAtColumn = schema && schema.length > 0 && 'read_at' in schema[0];
    const hasReceiverIdColumn = schema && schema.length > 0 && 'receiver_id' in schema[0];
    
    if (hasReadAtColumn && hasReceiverIdColumn) {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('receiver_id', userId)
        .eq('sender_id', senderId)
        .is('read_at', null);
        
      if (error) throw error;
    } else if (hasReadAtColumn) {
      // Find the conversation between users
      const { data: convData, error: convError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .or(`and(user_id.eq.${userId}),and(user_id.eq.${senderId})`)
        .limit(1);
        
      if (convError) throw convError;
      
      if (convData && convData.length > 0) {
        const conversationId = convData[0].conversation_id;
        
        const { error } = await supabase
          .from('messages')
          .update({ read_at: new Date().toISOString() })
          .eq('conversation_id', conversationId)
          .eq('sender_id', senderId)
          .is('read_at', null);
          
        if (error) throw error;
      }
    }
  } catch (error: any) {
    console.error("Error marking messages as read:", error.message);
  }
};

// Subscribe to new messages for the current user
export const subscribeToMessages = (userId: string, callback: (message: Message) => void) => {
  return supabase
    .channel('public:messages')
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
        receiver_id: newMessage.receiver_id || userId, // Use userId as fallback if receiver_id is missing
        content: newMessage.content,
        created_at: newMessage.created_at,
        read: newMessage.read_at !== null
      });
    })
    .subscribe();
};
