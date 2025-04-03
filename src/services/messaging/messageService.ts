
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/types/messaging";

/**
 * Get messages for a conversation
 */
export const getMessages = async (conversationId: string): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:profiles!sender_id(id, username, avatar_url, full_name)
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting messages:", error);
    return [];
  }
};

/**
 * Send a message in a conversation
 */
export const sendMessage = async (
  conversationId: string, 
  content: string
): Promise<Message | null> => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error("User not authenticated");

    // First insert the message
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content,
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) return null;

    // Update the conversation's updated_at timestamp
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    // Get sender profile info
    const { data: senderData } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, full_name")
      .eq("id", user.id)
      .single();

    return {
      ...data,
      sender: senderData || null
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

/**
 * Mark messages as read
 */
export const markMessagesAsRead = async (conversationId: string): Promise<boolean> => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from("messages")
      .update({ read_at: new Date().toISOString() })
      .eq("conversation_id", conversationId)
      .neq("sender_id", user.id)
      .is("read_at", null);

    return !error;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return false;
  }
};

/**
 * Get unread message count for all conversations
 */
export const getUnreadMessageCount = async (): Promise<number> => {
  try {
    const { user } = useAuth();
    if (!user) return 0;

    const { data, error } = await supabase
      .from("messages")
      .select("id", { count: "exact" })
      .neq("sender_id", user.id)
      .is("read_at", null);

    if (error) throw error;
    return data?.length || 0;
  } catch (error) {
    console.error("Error getting unread message count:", error);
    return 0;
  }
};

/**
 * Listen for new messages in a conversation
 */
export const subscribeToMessages = (
  conversationId: string,
  callback: (message: Message) => void
) => {
  const { user } = useAuth();
  if (!user) return () => {};

  const subscription = supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      async (payload) => {
        // Get the sender's profile
        const { data: senderData } = await supabase
          .from("profiles")
          .select("id, username, avatar_url, full_name")
          .eq("id", payload.new.sender_id)
          .single();

        const message = {
          ...payload.new,
          sender: senderData || null
        } as Message;

        callback(message);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
