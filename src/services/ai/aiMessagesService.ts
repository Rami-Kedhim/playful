import { supabase } from '@/lib/supabase';
import { AIMessage, AIMessageResponse } from '@/types/ai-chat';

export const aiMessagesService = {
  async sendMessage(message: Partial<AIMessage>): Promise<AIMessage | null> {
    // Fix the properties to match the database schema
    const { data, error } = await supabase
      .from('ai_messages')
      .insert({
        content: message.content,
        sender_id: message.senderId,
        receiver_id: message.receiverId,
        conversation_id: message.conversation_id
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    return this.mapDatabaseMessageToAIMessage(data);
  },

  async getMessagesByConversationId(conversationId: string): Promise<AIMessage[]> {
    const { data, error } = await supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return data.map(this.mapDatabaseMessageToAIMessage);
  },

  async markMessagesAsRead(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('ai_messages')
      .update({ has_read: true })
      .eq('conversation_id', conversationId)
      .eq('has_read', false);

    if (error) {
      console.error('Error marking messages as read:', error);
    }
  },

  mapDatabaseMessageToAIMessage(data: AIMessageResponse): AIMessage {
    return {
      id: data.id,
      role: data.is_ai ? 'assistant' : 'user',
      content: data.content,
      timestamp: new Date(data.created_at),
      senderId: data.sender_id,
      receiverId: data.sender_id, // This might need to be updated based on schema
      isAI: data.is_ai,
      has_read: data.has_read,
      requires_payment: data.requires_payment,
      price: data.price,
      payment_status: data.payment_status as any,
      created_at: data.created_at
    };
  }
};
