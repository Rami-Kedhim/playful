import { AICompanionMessage } from '@/hooks/ai-companion/types';

// Mock AI companion service
const aiCompanionService = {
  getCompanionMessages: async (companionId: string, userId: string): Promise<AICompanionMessage[]> => {
    // Simulate fetching messages from a database or API
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
    // Simulate sending a message and receiving a response
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: AICompanionMessage = {
          id: Date.now().toString(),
          content: content,
          role: 'user',
          timestamp: new Date().toISOString(),
          is_from_user: true,
        };
        resolve(newMessage);
      }, 500);
    });
  },

  getAIResponse: async (companionId: string, userId: string, message: string): Promise<AICompanionMessage> => {
    // Simulate getting a response from the AI
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
    // Simulate generating content based on the prompt and type
    return new Promise((resolve) => {
      setTimeout(() => {
        const generatedContent = `Generated ${type} content for prompt: ${prompt}`;
        resolve(generatedContent);
      }, 1500);
    });
  },
};

export default aiCompanionService;
