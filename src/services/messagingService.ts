
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

// Fetch conversations for the current user
export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // Since the conversations_view doesn't exist, let's use a more direct approach
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        content,
        created_at,
        sender_id,
        receiver_id,
        read,
        profiles!profiles_sender_id_fkey(id, username, avatar_url)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Process the data to create a conversations list
    const conversationsMap = new Map<string, Conversation>();
    
    if (data) {
      data.forEach(message => {
        const otherUserId = message.sender_id === userId ? message.receiver_id : message.sender_id;
        const profileData = message.profiles;
        
        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            id: otherUserId,
            last_message: message.content,
            last_message_time: message.created_at,
            unread_count: (message.sender_id !== userId && !message.read) ? 1 : 0,
            participant: {
              id: otherUserId,
              name: profileData?.username || 'Unknown User',
              avatar_url: profileData?.avatar_url,
              type: profileData?.creator_id ? 'creator' : 'escort'
            }
          });
        }
      });
    }
    
    return Array.from(conversationsMap.values());
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
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
      .order('created_at');
      
    if (error) throw error;
    
    // Convert the data to match our Message interface
    const messages: Message[] = data?.map(msg => ({
      id: msg.id,
      sender_id: msg.sender_id,
      receiver_id: msg.receiver_id,
      content: msg.content,
      created_at: msg.created_at,
      read: msg.read || false
    })) || [];
    
    return messages;
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
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        read: false
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
      read: data.read || false
    };
    
    return message;
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
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('receiver_id', userId)
      .eq('sender_id', senderId)
      .eq('read', false);
      
    if (error) throw error;
  } catch (error: any) {
    console.error("Error marking messages as read:", error.message);
  }
};

// Subscribe to new messages for the current user
export const subscribeToMessages = (userId: string, callback: (message: Message) => void) => {
  return supabase
    .channel('messages')
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
        read: newMessage.read || false
      });
    })
    .subscribe();
};
