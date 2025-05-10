
import { LucieAI } from '@/core/Lucie';
import { Hermes } from '@/core/Hermes';
import { Oxum } from '@/core/Oxum';
import { Orus } from '@/core/Orus';

export interface LucieAISystem extends LucieAI {}
export interface HermesSystem extends Hermes {}
export interface OxumSystem extends Oxum {}
export interface OrusSystem extends Orus {}

export interface UberCoreSystem {
  lucieAI: LucieAISystem;
  hermesSystem: HermesSystem;
  oxumSystem: OxumSystem;
  initialize(): Promise<void>;
  checkSubsystemHealth(): Array<{
    name: string;
    status: string;
    health: number;
  }>;
  initializeAutomaticSeo(): {
    success: boolean;
    message: string;
  };
}

export interface GenerateContentParams {
  prompt: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  };
}

export interface GenerateContentResult {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ModerateContentParams {
  content: string;
  context?: string;
}

export interface ModerateContentResult {
  isSafe: boolean;
  categories: {
    sexual: boolean;
    hate: boolean;
    harassment: boolean;
    selfHarm: boolean;
    violence: boolean;
  };
  categoryScores: {
    sexual: number;
    hate: number;
    harassment: number;
    selfHarm: number;
    violence: number;
  };
  flagged: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  entities?: Array<{
    text: string;
    sentiment: string;
    score: number;
  }>;
}

export interface SystemStatus {
  healthy: boolean;
  version: string;
  components: Record<string, {
    status: 'online' | 'offline' | 'degraded';
    lastChecked: Date;
  }>;
}

export interface SystemIntegrityResult {
  passed: boolean;
  issues: string[];
  score: number;
}

export interface SessionValidationResult {
  valid: boolean;
  reason?: string;
  trustScore?: number;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  requestsPerSecond: number;
  averageLatency: number;
  errorRate: number;
}

export interface RecommendedAction {
  id: string;
  type: string;
  priority: number;
  title: string;
  description: string;
  action: string;
}

export interface HermesInsight {
  score: number;
  recommendations: string[];
  metrics: Record<string, number>;
  analysis: string;
}
