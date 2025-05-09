
export type ContentType = 'text' | 'image' | 'video' | 'multimodal';

export interface AIModel {
  id: string;
  name: string;
  type: ContentType;
  description?: string;
  useCase?: string;
}

export interface AIGenerationOptions {
  prompt: string;
  model?: string;
  negativePrompt?: string;
  guidanceScale?: number;
  steps?: number;
  width?: number;
  height?: number;
  options?: Record<string, any>;
}

export interface AIGenerationResult {
  url?: string;
  text?: string;
  success: boolean;
  error?: string;
  processingTime?: number;
}

export interface NSFWImageGenerationParams {
  model?: string;
  name?: string;
  age?: string;
  ethnicity?: string;
  style?: string;
  skinTone?: string;
  clothing?: string;
  background?: string;
  pose?: string;
  tags?: string[];
  customPrompt?: string;
  negativePrompt?: string;
}
