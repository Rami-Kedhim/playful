
// Fix missing exports and property names according to AICompanionMessage type
// Simplify mock data and use correct properties

import { v4 as uuidv4 } from 'uuid';
import { AICompanionMessage } from '@/types/ai-companion';

const aiCompanionsMessages: AICompanionMessage[] = [];

export const aiCompanionService = {
  generateContent: async (params: any): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `AI Generated Content for: ${params.prompt}`;
  },

  getCompanionStats: async (companionId: string): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      messages_sent: 150,
      messages_received: 140,
      total_interaction_time: 3600,
      last_interaction: new Date().toISOString(),
      chat_messages: 100,
      images_generated: 20,
      voice_messages: 30,
    };
  },

  sendMessage: async (companionId: string, message: string, userId: string): Promise<AICompanionMessage> => {
    const newMessage: AICompanionMessage = {
      id: uuidv4(),
      aiCompanionId: companionId,
      content: message,
      role: 'user',
      created_at: new Date().toISOString(),
      user_id: userId,
    };
    aiCompanionsMessages.push(newMessage);
    return newMessage;
  },

  receiveMessage: async (companionId: string, message: string, userId: string): Promise<AICompanionMessage> => {
    const newMessage: AICompanionMessage = {
      id: uuidv4(),
      aiCompanionId: companionId,
      content: message,
      role: 'assistant',
      created_at: new Date().toISOString(),
      user_id: userId,
    };
    aiCompanionsMessages.push(newMessage);
    return newMessage;
  },

  getMessages: async (companionId: string, userId: string): Promise<AICompanionMessage[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return aiCompanionsMessages.filter(msg => msg.aiCompanionId === companionId && msg.user_id === userId);
  },

  updateCompanion: async (companionId: string, updates: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id: companionId, ...updates };
  },

  createCompanion: async (params: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { id: uuidv4(), ...params };
  },

  deleteCompanion: async (companionId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return true;
  },
};

