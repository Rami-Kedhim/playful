
/**
 * AI Profile Types
 */

export enum ProcessingStatus {
  IDLE = 'idle',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export type ProcessingStatusDetails = {
  status: ProcessingStatus;
  message?: string;
  progress?: number;
  error?: string;
};

export interface AIModelGenerationParams {
  prompt?: string;
  name?: string;
  type?: string;
  traits?: string[];
  presets?: string[];
  gender?: string;
  age?: number;
  personality?: string[];
  interests?: string[];
  description?: string;
}

export interface AIModelGenerationResult {
  id: string;
  name: string;
  avatarUrl?: string;
  status: ProcessingStatus;
  progress?: number;
  error?: string;
  createdAt: Date | string;
  completedAt?: Date | string;
  profileData?: any;
}

export interface AIProfile {
  id: string;
  name: string;
  avatarUrl: string;
  description?: string;
  personality?: string[];
  traits?: string[];
  interests?: string[];
  type?: string;
  gender?: string;
  age?: number;
  created_at?: Date | string;
  creatorId?: string;
  emotionalState?: {
    primary: string;
    secondary?: string;
    intensity: number;
  };
  voiceConfig?: {
    enabled: boolean;
    voiceId?: string;
    pitch?: number;
    rate?: number;
  };
}
