
/**
 * Central service for interacting with Hugging Face models
 */

export interface GenerationParams {
  prompt: string;
  model?: string;
  maxLength?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  repetitionPenalty?: number;
  seed?: number;
  safety?: boolean;
  nsfw?: boolean;
  extra?: Record<string, any>;
}

export interface GenerationResult {
  success: boolean;
  content?: string;
  url?: string;
  error?: string;
  meta?: Record<string, any>;
}

interface ModelInfo {
  id: string;
  name: string;
  type: 'text' | 'image' | 'video' | 'multimodal';
  nsfw: boolean;
  recommended: boolean;
}

class HuggingFaceService {
  private apiKey?: string;
  private models: ModelInfo[] = [
    // Text models
    { id: 'gpt2', name: 'GPT-2', type: 'text', nsfw: false, recommended: true },
    { id: 'llama3-8b', name: 'Llama 3 (8B)', type: 'text', nsfw: false, recommended: true },
    
    // Image models
    { id: 'stable-diffusion-v1-5', name: 'Stable Diffusion v1.5', type: 'image', nsfw: false, recommended: true },
    { id: 'sdxl', name: 'Stable Diffusion XL', type: 'image', nsfw: false, recommended: true },
    { id: 'playground-v2.5', name: 'Playground v2.5', type: 'image', nsfw: true, recommended: true },
    
    // Video models
    { id: 'zeroscope-v2', name: 'Zeroscope V2', type: 'video', nsfw: false, recommended: true },
    
    // Multimodal models
    { id: 'llava-13b', name: 'LLaVA-13B', type: 'multimodal', nsfw: false, recommended: true },
  ];

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  /**
   * Set the Hugging Face API key
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * Generate content based on parameters
   */
  async generateContent(params: GenerationParams): Promise<GenerationResult> {
    // Check if API key is set
    if (!this.apiKey && !import.meta.env.VITE_HUGGING_FACE_API_KEY) {
      console.error('Hugging Face API key not set');
      return { 
        success: false, 
        error: 'API key not configured. Please set your Hugging Face API key.' 
      };
    }

    try {
      const apiKey = this.apiKey || import.meta.env.VITE_HUGGING_FACE_API_KEY;
      
      // Mock implementation (would be replaced with actual API calls)
      console.log(`Generating content with model: ${params.model || 'default'}`);
      console.log(`Prompt: ${params.prompt}`);
      
      if (params.nsfw === true && !this.isNsfwModelAvailable(params.model)) {
        return {
          success: false,
          error: 'NSFW content generation requested but no suitable model is available'
        };
      }

      // For now, return mock data based on content type
      const model = this.getModelInfo(params.model);
      
      if (model?.type === 'image') {
        return {
          success: true,
          url: 'https://placeholder.com/400x400',
          meta: { width: 400, height: 400, model: params.model }
        };
      } else if (model?.type === 'video') {
        return {
          success: true,
          url: 'https://placeholder.com/video.mp4',
          meta: { duration: 10, model: params.model }
        };
      } else {
        // Default to text
        return {
          success: true,
          content: `Generated response for: ${params.prompt}`,
          meta: { tokens: params.prompt.length * 2, model: params.model }
        };
      }
    } catch (error) {
      console.error('Error generating content:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get available models based on content type
   */
  getAvailableModels(type?: 'text' | 'image' | 'video' | 'multimodal' | 'general'): ModelInfo[] {
    if (!type || type === 'general') {
      return this.models;
    }
    
    return this.models.filter(model => model.type === type);
  }

  /**
   * Get recommended model for a specific content type
   */
  getRecommendedModel(type: 'text' | 'image' | 'video' | 'multimodal' | 'general'): string {
    const models = this.getAvailableModels(type);
    const recommended = models.find(model => model.recommended);
    return recommended?.id || models[0]?.id || '';
  }

  /**
   * Get detailed information about a model
   */
  getModelInfo(modelId?: string): ModelInfo | undefined {
    if (!modelId) return undefined;
    return this.models.find(model => model.id === modelId);
  }

  /**
   * Check if NSFW model is available
   */
  isNsfwModelAvailable(modelId?: string): boolean {
    if (!modelId) return false;
    const model = this.getModelInfo(modelId);
    return model?.nsfw || false;
  }
}

// Export a singleton instance
export const huggingFaceService = new HuggingFaceService();

// For backward compatibility
export default huggingFaceService;
