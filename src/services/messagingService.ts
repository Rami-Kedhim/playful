
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

// Helper function to check if a column exists in a table
async function checkColumnExists(tableName: string, columnName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(columnName)
      .limit(1);
    
    return !error;
  } catch (error) {
    console.error(`Error checking if column ${columnName} exists in ${tableName}:`, error);
    return false;
  }
}

// Helper function to check if a table exists
async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    return !error;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
}

// Fetch conversations for the current user
export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // First check if receiver_id column exists in messages
    const hasReceiverIdColumn = await checkColumnExists('messages', 'receiver_id');
    // Check if conversations table exists
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
          profiles:sender_id(id, username, avatar_url, is_content_creator, is_escort)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (!data || data.length === 0) return [];
      
      // Process the data to create a conversations list
      const conversationsMap = new Map<string, Conversation>();
      
      data.forEach(message => {
        try {
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
        } catch (err) {
          console.error("Error processing message:", err);
        }
      });
      
      return Array.from(conversationsMap.values());
    } else if (hasConversationsTable) {
      // Conversation-based model
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          messages(content, created_at, sender_id, read_at),
          conversation_participants!conversation_id(
            user_id,
            profiles:user_id(id, username, avatar_url, is_content_creator, is_escort)
          )
        `)
        .or(`conversation_participants.user_id.eq.${userId}`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (!data || data.length === 0) return [];
      
      // Process conversations data
      const conversations: Conversation[] = [];
      
      data.forEach(conv => {
        try {
          // Find participants other than the current user
          const participants = conv.conversation_participants || [];
          const otherParticipant = participants.find(p => p.user_id !== userId);
          if (!otherParticipant) return;
          
          // Get the last message
          const messages = conv.messages || [];
          const lastMessage = messages.length > 0 ? messages[0] : null;
          if (!lastMessage) return;
          
          const profileData = otherParticipant.profiles;
          
          conversations.push({
            id: conv.id, // Using conversation ID as the identifier
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
        } catch (err) {
          console.error("Error processing conversation:", err);
        }
      });
      
      return conversations;
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
    // Check if receiver_id column exists in messages
    const hasReceiverIdColumn = await checkColumnExists('messages', 'receiver_id');
    // Check if conversations table exists
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
      const { data: convParticipants, error: convError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId);
        
      if (convError) throw convError;
      
      if (!convParticipants || convParticipants.length === 0) return [];
      
      // Get all conversations where this user is a participant
      const userConversationIds = convParticipants.map(p => p.conversation_id);
      
      // Find conversations where the other user is also a participant
      const { data: otherParticipants, error: otherError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', otherUserId)
        .in('conversation_id', userConversationIds);
        
      if (otherError) throw otherError;
      
      if (!otherParticipants || otherParticipants.length === 0) return [];
      
      // We found a common conversation
      const conversationId = otherParticipants[0].conversation_id;
      
      // Get the messages
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at');
        
      if (error) throw error;
      
      if (!data) return [];
      
      // Convert the data to match our Message interface
      const messages: Message[] = data.map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        receiver_id: msg.sender_id === userId ? otherUserId : userId, // Inferred
        content: msg.content,
        created_at: msg.created_at,
        read: msg.read_at !== null
      }));
      
      return messages;
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
          content,
          read_at: null
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
      
      // Look for existing conversation
      const { data: usersConvs, error: usersConvsError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', senderId);
        
      if (usersConvsError) throw usersConvsError;
      
      if (usersConvs && usersConvs.length > 0) {
        const userConvIds = usersConvs.map(c => c.conversation_id);
        
        // Check if other user is part of any of these conversations
        const { data: otherUserConvs, error: otherUserError } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', receiverId)
          .in('conversation_id', userConvIds);
          
        if (otherUserError) throw otherUserError;
        
        if (otherUserConvs && otherUserConvs.length > 0) {
          conversationId = otherUserConvs[0].conversation_id;
        }
      }
      
      // If no conversation exists, create one
      if (!conversationId) {
        const { data: newConv, error: newConvError } = await supabase
          .from('conversations')
          .insert({})
          .select('id')
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
        receiver_id: receiverId, // Inferred
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
      // Find the conversation between the users
      const { data: usersConvs, error: usersConvsError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId);
        
      if (usersConvsError) throw usersConvsError;
      
      if (usersConvs && usersConvs.length > 0) {
        const userConvIds = usersConvs.map(c => c.conversation_id);
        
        // Check which conversations also have the sender
        const { data: otherUserConvs, error: otherUserError } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', senderId)
          .in('conversation_id', userConvIds);
          
        if (otherUserError) throw otherUserError;
        
        if (otherUserConvs && otherUserConvs.length > 0) {
          const conversationId = otherUserConvs[0].conversation_id;
          
          // Update messages as read
          const { error } = await supabase
            .from('messages')
            .update({ read_at: new Date().toISOString() })
            .eq('conversation_id', conversationId)
            .eq('sender_id', senderId)
            .is('read_at', null);
            
          if (error) throw error;
        }
      }
    }
  } catch (error: any) {
    console.error("Error marking messages as read:", error.message);
  }
};

// Subscribe to new messages for the current user
export const subscribeToMessages = (userId: string, callback: (message: Message) => void) => {
  let filter = `receiver_id=eq.${userId}`;
  
  // Check if we need to use conversations model instead
  checkColumnExists('messages', 'receiver_id').then(hasReceiverIdColumn => {
    if (!hasReceiverIdColumn) {
      // Use conversations model subscription
      console.log("Using conversations model subscription");
      filter = 'conversation_id=in.(select conversation_id from conversation_participants where user_id=eq.' + userId + ')';
    }
    
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter
      }, (payload) => {
        const newMessage = payload.new as any;
        
        // Determine the receiver_id for the message object
        let receiverId = newMessage.receiver_id || userId;
        if (!newMessage.receiver_id && newMessage.conversation_id) {
          // For conversation model, all new messages where the user isn't the sender
          // are considered to be received by the user
          receiverId = newMessage.sender_id === userId ? 'unknown' : userId;
        }
        
        callback({
          id: newMessage.id,
          sender_id: newMessage.sender_id,
          receiver_id: receiverId,
          content: newMessage.content,
          created_at: newMessage.created_at,
          read: newMessage.read_at !== null
        });
      })
      .subscribe();
      
    return channel;
  });
  
  // Return a default channel that can be unsubscribed
  return {
    unsubscribe: () => {
      // This will be replaced by the actual channel's unsubscribe method
      console.log("Unsubscribing from messages channel");
    }
  };
};
