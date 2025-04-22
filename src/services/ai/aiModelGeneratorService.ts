
// Fix AIProfile property naming: use created_at instead of createdAt
// Remove gender property, fix literal according to AIProfile type

import { AIProfile, ProcessingStatus } from '@/types/ai-profile';

export interface AIModelGeneratorOptions {
  name: string;
  personality: { type: string; traits?: string[] };
  appearance: string;
  voice: string;
}

export interface AIModelGeneratorState {
  isGenerating: boolean;
  progress: number;
  currentStage: string;
  processingStatus: {
    status: ProcessingStatus;
    message?: string;
    completedCount: number;
    totalCount: number;
  };
  error: Error | null;
  generatedModel: AIProfile | null;
}

export const aiModelGeneratorService = {
  async generateModel(
    options: AIModelGeneratorOptions,
    onProgress: (
      progress: number,
      stage: string,
      completed: number,
      total: number
    ) => void
  ): Promise<AIProfile> {
    return new Promise((resolve, reject) => {
      const totalSteps = 100;
      let completedSteps = 0;

      const updateProgress = (stage: string, steps: number) => {
        completedSteps += steps;
        const progress = (completedSteps / totalSteps) * 100;
        onProgress(progress, stage, completedSteps, totalSteps);
      };

      try {
        updateProgress('Initializing', 5);
        setTimeout(() => {
          updateProgress('Configuring Personality', 15);
          setTimeout(() => {
            updateProgress('Designing Appearance', 25);
            setTimeout(() => {
              updateProgress('Synthesizing Voice', 35);
              setTimeout(() => {
                updateProgress('Finalizing Model', 20);
                setTimeout(() => {
                  const generatedModel: AIProfile = {
                    id: 'ai-model-' + Date.now(),
                    name: options.name,
                    bio: '',
                    personality: options.personality,
                    avatar_url: '/images/ai-avatar.png',
                    location: 'Virtual',
                    interests: ['chatting', 'learning', 'fun'],
                    isVerified: true,
                    created_at: new Date().toISOString(),
                    category: 'AI Companion',
                    rating: 4.5,
                    review_count: 100,
                    price: 0,
                    is_premium: false,
                    availability_status: 'available',
                  };
                  updateProgress('Model Ready', 0);
                  resolve(generatedModel);
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      } catch (error: any) {
        console.error('Model generation failed:', error);
        reject(error);
      }
    });
  }
};
