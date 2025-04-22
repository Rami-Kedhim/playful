
import { AIMessage, AIConversation } from '@/types/ai-profile';

interface MessagePayload {
  content: string;
  profileId: string;
}

interface MessageResponse {
  success: boolean;
  message?: string;
  messages?: AIMessage[];
  conversation?: AIConversation;
}

export const sendMessage = async (payload: MessagePayload): Promise<MessageResponse> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a mock user message
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      senderId: 'current-user-id',
      receiverId: payload.profileId,
      content: payload.content,
      timestamp: new Date().toISOString(),
      isAI: false
    };
    
    // Create a mock AI response
    const aiResponse: AIMessage = {
      id: `ai-${Date.now()}`,
      senderId: payload.profileId,
      receiverId: 'current-user-id',
      content: `This is an AI response to: "${payload.content}"`,
      timestamp: new Date().toISOString(),
      isAI: true
    };
    
    // Return both messages
    return {
      success: true,
      messages: [userMessage, aiResponse],
      conversation: {
        id: 'mock-conversation-id',
        user_id: 'current-user-id',
        ai_profile_id: payload.profileId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        messages: [userMessage, aiResponse]
      }
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      success: false,
      message: 'Failed to send message'
    };
  }
};

export const fetchMessages = async (profileId: string): Promise<{
  messages: AIMessage[];
  conversation: AIConversation;
}> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    const mockMessages: AIMessage[] = [
      {
        id: 'msg1',
        senderId: 'current-user-id',
        receiverId: profileId,
        content: 'Hello there!',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isAI: false
      },
      {
        id: 'msg2',
        senderId: profileId,
        receiverId: 'current-user-id',
        content: 'Hi! How can I help you today?',
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        isAI: true
      }
    ];
    
    const mockConversation: AIConversation = {
      id: 'mock-conversation-id',
      user_id: 'current-user-id',
      ai_profile_id: profileId,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date(Date.now() - 3500000).toISOString(),
      messages: mockMessages
    };
    
    return {
      messages: mockMessages,
      conversation: mockConversation
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

export const markMessagesAsRead = async (messageIds: string[]): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return false;
  }
};
