import { supabase } from '@/lib/supabase';
import { AIConversation } from '@/types/ai-chat';
import { AIProfile } from '@/types/ai-profile';

export const fetchConversation = async (conversationId: string): Promise<AIConversation> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    const mockConversation: AIConversation = {
      id: conversationId,
      user_id: 'current-user-id',
      ai_profile_id: 'ai-profile-id',
      created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 3600000).toISOString(),
      messages: [
        {
          id: 'msg1',
          senderId: 'current-user-id',
          receiverId: 'ai-profile-id',
          content: 'Hello there!',
          timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
          isAI: false
        },
        {
          id: 'msg2',
          senderId: 'ai-profile-id',
          receiverId: 'current-user-id',
          content: 'Hi! How can I help you today?',
          timestamp: new Date(Date.now() - 1.9 * 3600000).toISOString(),
          isAI: true
        }
      ]
    };
    
    return mockConversation;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw new Error('Failed to fetch conversation');
  }
};

export const getConversations = async (userId: string): Promise<AIConversation[]> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    const mockConversations: AIConversation[] = [
      {
        id: 'conv1',
        user_id: userId,
        ai_profile_id: 'ai1',
        created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 3600000).toISOString()
      },
      {
        id: 'conv2',
        user_id: userId,
        ai_profile_id: 'ai2',
        created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
        updated_at: new Date(Date.now() - 12 * 3600000).toISOString()
      }
    ];
    
    return mockConversations;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw new Error('Failed to fetch conversations');
  }
};
