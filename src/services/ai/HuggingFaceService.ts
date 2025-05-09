
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface AIModelInfo {
  id: string;
  name: string;
  type: 'text' | 'image' | 'video' | 'multimodal';
  description?: string;
  useCase?: string;
}

export interface GenerationParams {
  prompt: string;
  model?: string;
  negativePrompt?: string;
  guidanceScale?: number;
  steps?: number;
  width?: number;
  height?: number;
  seed?: number;
  options?: Record<string, any>;
}

export interface GenerationResult {
  url?: string;
  text?: string;
  success: boolean;
  error?: string;
  processingTime?: number;
}

/**
 * Central service for handling all Hugging Face API integrations
 */
export class HuggingFaceService {
  // Recommended models for different use cases
  private readonly RECOMMENDED_MODELS = {
    nsfw: 'stablediffusionapi/realistic-vision-v5',
    general: 'black-forest-labs/FLUX.1-schnell',
    portrait: 'lykon/dreamshaper-8',
    video: 'cerspense/zeroscope_v2_576w',
    text: 'deepseek-ai/deepseek-llm-67b-chat',
    multimodal: 'deepseek-ai/deepseek-vl-7b-chat'
  };
  
  /**
   * Get available AI models for content generation
   */
  public getAvailableModels(type?: 'text' | 'image' | 'video' | 'multimodal'): AIModelInfo[] {
    const allModels = [
      {
        id: 'deepseek-ai/deepseek-vl-7b-chat',
        name: 'DeepSeek Vision-Language 7B',
        type: 'multimodal' as const,
        description: 'Multimodal model that can understand both text and images',
        useCase: 'Content analysis and generation based on visual inputs'
      },
      {
        id: 'deepseek-ai/deepseek-llm-67b-chat',
        name: 'DeepSeek LLM 67B',
        type: 'text' as const,
        description: 'Large language model for text generation',
        useCase: 'Detailed text content creation and conversations'
      },
      {
        id: 'black-forest-labs/FLUX.1-schnell',
        name: 'FLUX Schnell',
        type: 'image' as const,
        description: 'Fast image generation model',
        useCase: 'Quick, high-quality image generation'
      },
      {
        id: 'stablediffusionapi/realistic-vision-v5',
        name: 'Realistic Vision v5',
        type: 'image' as const,
        description: 'Specialized in realistic image generation',
        useCase: 'Detailed human portraits and realistic scenarios'
      },
      {
        id: 'lykon/dreamshaper-8',
        name: 'Dreamshaper 8',
        type: 'image' as const,
        description: 'Creative and artistic image generation',
        useCase: 'Artistic and stylized content creation'
      },
      {
        id: 'cerspense/zeroscope_v2_576w',
        name: 'Zeroscope v2',
        type: 'video' as const,
        description: 'Video generation from text descriptions',
        useCase: 'Short video clips and animations'
      }
    ];
    
    return type ? allModels.filter(model => model.type === type) : allModels;
  }
  
  /**
   * Generate content using Hugging Face APIs via Supabase Edge Functions
   */
  public async generateContent(params: GenerationParams): Promise<GenerationResult> {
    try {
      const startTime = performance.now();
      
      // Determine the content type based on the model or fallback to default
      let contentType = 'image';
      
      if (params.model?.includes('zeroscope')) {
        contentType = 'video';
      } else if (params.model?.includes('deepseek-llm') || params.model?.includes('llama')) {
        contentType = 'text';
      } else if (params.model?.includes('deepseek-vl')) {
        contentType = 'multimodal';
      }
      
      // Select the appropriate edge function based on content type
      let functionName = 'generate-media';
      
      if (contentType === 'text') {
        functionName = 'generate-ai-message';
      } else if (params.model?.includes('realistic-vision') || contentType === 'nsfw') {
        functionName = 'generate-nsfw-image';
      }
      
      // Show loading toast
      toast({
        title: `Generating ${contentType}...`,
        description: "Please wait while we create your content...",
      });
      
      // Call the appropriate Supabase Edge Function
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: {
          prompt: params.prompt,
          modelId: params.model,
          negative_prompt: params.negativePrompt,
          guidance_scale: params.guidanceScale || 7.5,
          num_inference_steps: params.steps || 30,
          width: params.width || 1024,
          height: params.height || 1024,
          ...params.options
        }
      });
      
      if (error) throw new Error(error.message);
      
      const endTime = performance.now();
      const processingTime = endTime - startTime;
      
      // Handle binary responses (e.g., images, videos)
      if (data instanceof ArrayBuffer) {
        const contentTypeHeader = contentType === 'video' ? 'video/mp4' : 'image/png';
        const blob = new Blob([data], { type: contentTypeHeader });
        const url = URL.createObjectURL(blob);
        
        toast({
          title: "Content Generated",
          description: `Your ${contentType} was created successfully!`,
        });
        
        return { url, success: true, processingTime };
      }
      
      // Handle text/JSON responses
      if (typeof data === 'string') {
        return { text: data, success: true, processingTime };
      } else if (data?.text) {
        return { text: data.text, success: true, processingTime };
      } else if (data?.url) {
        return { url: data.url, success: true, processingTime };
      }
      
      // Handle error in response
      if (data?.error) {
        throw new Error(data.error);
      }
      
      toast({
        title: "Content Generated",
        description: `Your ${contentType} was created successfully!`,
      });
      
      return { 
        url: typeof data === 'string' ? data : data?.url, 
        text: data?.text,
        success: true, 
        processingTime 
      };
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate content';
      console.error('AI content generation error:', errorMessage);
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    }
  }
  
  /**
   * Get the recommended model for a specific use case
   */
  public getRecommendedModel(useCase: keyof typeof this.RECOMMENDED_MODELS): string {
    return this.RECOMMENDED_MODELS[useCase] || this.RECOMMENDED_MODELS.general;
  }
}

// Export a singleton instance
export const huggingFaceService = new HuggingFaceService();
export default huggingFaceService;
