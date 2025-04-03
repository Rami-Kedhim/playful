import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { getMessagingSchema } from "./schemaDetection";
import { Message } from "./types";

export const fetchMessages = async (userId: string, otherUserId: string): Promise<Message[]> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      return await fetchDirectMessages(userId, otherUserId);
    } else if (messagingSchema === 'conversation') {
      return await fetchConversationMessages(userId, otherUserId);
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

async function fetchDirectMessages(userId: string, otherUserId: string): Promise<Message[]> {
  try {
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
  } catch (err) {
    console.error("Error fetching direct messages:", err);
    return [];
  }
}

async function fetchConversationMessages(userId: string, otherUserId: string): Promise<Message[]> {
  try {
    // Find conversations that both users are part of
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
}

export const sendMessage = async (senderId: string, receiverId: string, content: string): Promise<Message | null> => {
  try {
    // Determine which messaging schema is being used
    const messagingSchema = await getMessagingSchema();
    
    if (messagingSchema === 'direct') {
      return await sendDirectMessage(senderId, receiverId, content);
    } else if (messagingSchema === 'conversation') {
      return await sendConversationMessage(senderId, receiverId, content);
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

async function sendDirectMessage(senderId: string, receiverId: string, content: string): Promise<Message | null> {
  try {
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
  } catch (err) {
    console.error("Error sending direct message:", err);
    return null;
  }
}

async function sendConversationMessage(senderId: string, receiverId: string, content: string): Promise<Message | null> {
  try {
    // First check if a conversation exists between these users
    let conversationId: string | null = null;
    
    // Find conversations that both users are part of
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
    const messageData = {
      conversation_id: conversationId,
      sender_id: senderId,
      content
    };
    
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) throw new Error("Failed to send message");
    
    // For the conversation model, we need to construct the full Message object
    // with an inferred receiver_id since it's not stored in the database
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
  } catch (err) {
    console.error("Error sending conversation message:", err);
    return null;
  }
}
