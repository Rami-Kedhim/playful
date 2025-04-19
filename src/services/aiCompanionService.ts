import { v4 as uuidv4 } from 'uuid';
import { AICompanionMessage } from '@/types/ai-companion';

const aiCompanions: AICompanionMessage[] = [];

export const aiCompanionService = {
  generateContent: async (params: any): Promise<string> => {
    // Simulate content generation
    await new Promise(resolve => setTimeout(resolve, 500));
    return `AI Generated Content for: ${params.prompt}`;
  },

  getCompanionStats: async (companionId: string): Promise<any> => {
    // Simulate fetching companion stats
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
      companionId: companionId,
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      userId: userId,
    };
    aiCompanions.push(newMessage);
    return newMessage;
  },

  receiveMessage: async (companionId: string, message: string, userId: string): Promise<AICompanionMessage> => {
    const newMessage: AICompanionMessage = {
      id: uuidv4(),
      companionId: companionId,
      content: message,
      sender: 'companion',
      timestamp: new Date().toISOString(),
      userId: userId,
    };
    aiCompanions.push(newMessage);
    return newMessage;
  },

  getMessages: async (companionId: string, userId: string): Promise<AICompanionMessage[]> => {
    // Simulate fetching messages
    await new Promise(resolve => setTimeout(resolve, 400));
    return aiCompanions.filter(msg => msg.companionId === companionId && msg.userId === userId);
  },

  updateCompanion: async (companionId: string, updates: any): Promise<any> => {
    // Simulate updating companion
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id: companionId, ...updates };
  },

  createCompanion: async (params: any): Promise<any> => {
    // Simulate creating a new AI companion
    await new Promise(resolve => setTimeout(resolve, 600));
    return { id: uuidv4(), ...params };
  },

  deleteCompanion: async (companionId: string): Promise<boolean> => {
    // Simulate deleting an AI companion
    await new Promise(resolve => setTimeout(resolve, 200));
    return true;
  },
};
