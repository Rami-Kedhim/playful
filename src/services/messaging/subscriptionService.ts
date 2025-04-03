
import { supabase } from "@/integrations/supabase/client";
import { getMessagingSchema } from "./schemaDetection";
import { Message } from "./types";

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
      subscriber.channel = subscribeToDirectMessages(userId, callback);
    } else if (messagingSchema === 'conversation') {
      subscriber.channel = subscribeToConversationMessages(userId, callback);
    }
  });
  
  return subscriber;
};

function subscribeToDirectMessages(userId: string, callback: (message: Message) => void) {
  return supabase
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
}

function subscribeToConversationMessages(userId: string, callback: (message: Message) => void) {
  // First get all conversations this user is a part of
  supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('user_id', userId)
    .then(({ data }) => {
      if (!data || data.length === 0) return null;
      
      const conversationIds = data.map(c => c.conversation_id);
      
      // Subscribe to messages in these conversations
      return supabase
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
    
  // Return a placeholder channel that will be replaced when the above promise resolves
  return null;
}
