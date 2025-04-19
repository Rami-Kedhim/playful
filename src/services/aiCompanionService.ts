
// Fix properties to conform AICompanionMessage type, removing wrong properties 'aiCompanionId' and 'user_id'
// Changing to 'companionId' and 'userId' consistent with typical JS naming conventions

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
      messagesSent: 150,
      messagesReceived: 140,
      totalInteractionTime: 3600,
      lastInteraction: new Date().toISOString(),
      chatMessages: 100,
      imagesGenerated: 20,
      voiceMessages: 30,
    };
  },

  sendMessage: async (companionId: string, message: string, userId: string): Promise<AICompanionMessage> => {
    const newMessage: AICompanionMessage = {
      id: uuidv4(),
      companionId,
      content: message,
      role: 'user',
      createdAt: new Date().toISOString(),
      userId,
    };
    aiCompanionsMessages.push(newMessage);
    return newMessage;
  },

  receiveMessage: async (companionId: string, message: string, userId: string): Promise<AICompanionMessage> => {
    const newMessage: AICompanionMessage = {
      id: uuidv4(),
      companionId,
      content: message,
      role: 'assistant',
      createdAt: new Date().toISOString(),
      userId,
    };
    aiCompanionsMessages.push(newMessage);
    return newMessage;
  },

  getMessages: async (companionId: string, userId: string): Promise<AICompanionMessage[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return aiCompanionsMessages.filter(msg => msg.companionId === companionId && msg.userId === userId);
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

