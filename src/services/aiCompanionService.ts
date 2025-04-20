
// Adjusted AI Companion Service mock to match typings and remove unknown keys like user_id, added userId param when needed.

import { AICompanionMessage } from '@/hooks/ai-companion/types';

// Mock AI companion service
const aiCompanionService = {
  getCompanionMessages: async (companionId: string, userId: string): Promise<AICompanionMessage[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const messages: AICompanionMessage[] = [
          {
            id: '1',
            content: 'Hello there! How can I assist you today?',
            role: 'assistant',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            content: 'I need some help with planning my trip.',
            role: 'user',
            timestamp: new Date().toISOString(),
          },
        ];
        resolve(messages);
      }, 500);
    });
  },

  sendMessage: async (companionId: string, userId: string, content: string): Promise<AICompanionMessage> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: AICompanionMessage = {
          id: Date.now().toString(),
          content: content,
          role: 'user',
          timestamp: new Date().toISOString(),
        };
        resolve(newMessage);
      }, 500);
    });
  },

  getAIResponse: async (companionId: string, userId: string, message: string): Promise<AICompanionMessage> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const aiResponse: AICompanionMessage = {
          id: Date.now().toString(),
          content: `AI response to: ${message}`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        resolve(aiResponse);
      }, 1000);
    });
  },

  generateContent: async (prompt: string, type: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const generatedContent = `Generated ${type} content for prompt: ${prompt}`;
        resolve(generatedContent);
      }, 1500);
    });
  },
};

export default aiCompanionService;

