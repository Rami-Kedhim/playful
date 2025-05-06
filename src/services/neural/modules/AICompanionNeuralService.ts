
import { BaseBrainService } from './BaseNeuralService';
import { ModuleType } from '../types/NeuralService';

export class AICompanionNeuralService extends BaseBrainService {
  constructor() {
    super({
      moduleId: 'ai-companion-neural-service',
      name: 'AI Companion Neural Service',
      description: 'Neural service for AI companion functionality',
      moduleType: ModuleType.COMPANION,
      version: '1.0.0',
      config: {
        enabled: true,
        priority: 'high',
        dependencies: ['hermes', 'orus']
      }
    });
  }
}

export const aiCompanionNeuralService = new AICompanionNeuralService();
