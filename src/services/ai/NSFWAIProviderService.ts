
import { AIModelPreference, AIProvider } from '@/types/ai';

export class NSFWAIProviderService {
  getProviders(): AIProvider[] {
    // Mock implementation
    return [
      {
        id: 'openai',
        name: 'OpenAI',
        models: [
          {
            id: 'gpt-4',
            name: 'GPT-4',
            description: 'Most advanced model',
            contextLength: 8192,
            model: 'gpt-4',
            temperature: 0.7,
            systemPrompt: 'You are a helpful assistant.'
          },
          {
            id: 'gpt-3.5-turbo',
            name: 'GPT-3.5 Turbo',
            description: 'Fast and efficient',
            contextLength: 4096,
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
            systemPrompt: 'You are a helpful assistant.'
          }
        ],
        apiKey: '',
        isEnabled: true,
        defaultModel: 'gpt-3.5-turbo'
      },
      {
        id: 'claude',
        name: 'Anthropic Claude',
        models: [
          {
            id: 'claude-2',
            name: 'Claude 2',
            description: 'Advanced AI assistant',
            contextLength: 100000,
            model: 'claude-2',
            temperature: 0.7,
            systemPrompt: 'You are Claude, an AI assistant.'
          }
        ],
        apiKey: '',
        isEnabled: false,
        defaultModel: 'claude-2'
      }
    ];
  }

  getDefaultProvider(): AIProvider {
    const providers = this.getProviders();
    const provider = providers.find(p => p.isEnabled) || providers[0];
    
    return {
      id: provider.id,
      name: provider.name,
      models: provider.models,
      apiKey: provider.apiKey,
      isEnabled: provider.isEnabled,
      defaultModel: provider.defaultModel
    };
  }
}

export const nsfwAIProviderService = new NSFWAIProviderService();
