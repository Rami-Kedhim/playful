
import { AIMessage, AIMessageResponse } from '@/types/ai-chat';

export const aiConversationsService = {
  sendMessage: async (message: Partial<AIMessage>): Promise<AIMessage> => {
    // Mock API call
    await new Promise(res => setTimeout(res, 500));

    // Return a mock response
    return {
      id: `msg-${Date.now()}`,
      role: message.role || 'user',
      content: message.content || '',
      timestamp: new Date(),
      // Removed invalid is_ai, use role instead to determine assistant or user if needed
      senderId: message.senderId,
      conversation_id: message.conversation_id,
      // status must be only "pending" | "completed" | "failed" - default to "pending"
      status: "pending",
    } as AIMessage;
  },

  getMessagesByConversationId: async (conversationId: string): Promise<AIMessage[]> => {
    // Mock API call
    await new Promise(res => setTimeout(res, 500));

    // Return mock messages
    return [
      {
        id: `msg-1`,
        role: 'user',
        content: 'Hello!',
        timestamp: new Date(),
        senderId: 'user-1',
        receiverId: 'ai-1',
        conversation_id: conversationId,
        status: "completed"
      },
      {
        id: `msg-2`,
        role: 'assistant',
        content: 'Hi there! How can I assist you today?',
        timestamp: new Date(),
        senderId: 'ai-1',
        receiverId: 'user-1',
        conversation_id: conversationId,
        status: "completed"
      }
    ];
  },

  markMessagesAsRead: async (conversationId: string): Promise<boolean> => {
    // Mock API call
    await new Promise(res => setTimeout(res, 500));
    return true;
  },

  mapDatabaseMessageToAIMessage: (data: AIMessageResponse): AIMessage => {
    return {
      id: data.id,
      role: data.is_ai ? 'assistant' : 'user',
      content: data.content,
      timestamp: new Date(data.created_at),
      has_read: data.has_read,
      requires_payment: data.requires_payment,
      price: data.price,
      payment_status: data.payment_status,
      conversation_id: data.conversation_id,
      senderId: data.sender_id,
      status: data.status as "pending" | "completed" | "failed",
    };
  },

  // Add fetchMessages for compatibility
  fetchMessages: async (conversationId: string): Promise<AIMessage[]> => {
    return aiConversationsService.getMessagesByConversationId(conversationId);
  }
};

