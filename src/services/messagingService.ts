
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
    const { data, error } = await supabase
      .from('conversations_view')
      .select('*')
      .eq('user_id', userId)
      .order('last_message_time', { ascending: false });
      
    if (error) throw error;
    
    return data || [];
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
    
    return data || [];
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
    
    return data;
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
      callback(payload.new as Message);
    })
    .subscribe();
};
