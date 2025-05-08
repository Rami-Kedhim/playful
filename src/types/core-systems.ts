
// Import types without conflicting with local declarations
import { OxumSystem as ImportedOxumSystem } from './oxum';

// Core system types
export interface SystemStatus {
  operational: boolean;
  latency?: number;
  services?: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
  };
  queueLength?: number;
  processing?: boolean;
  uptime?: number;
  lastReboot?: string;
  isActive?: boolean;
}

export interface SystemIntegrityResult {
  isValid: boolean;
  status: string;
  errors: string[];
  warnings: string[];
  lastChecked: string;
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  load: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiry: Date;
  username: string;
  timestamp: string;
}

export interface ModerateContentParams {
  content: string;
  context?: string;
  strictness?: number;
  contentType?: string; // Adding this to fix the error
}

export interface ModerateContentResult {
  isApproved: boolean;
  score: number;
  reasons?: string[];
  suggestedChanges?: string;
}

export interface GenerateContentResult {
  content: string;
  metadata?: Record<string, any>;
  tokens?: number;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  entities?: Array<{
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }>;
}

export interface LucieAISystem {
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string): Promise<GenerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
}

export interface UberCoreSystem {
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealthMetrics(): SystemHealthMetrics;
  validateSession(sessionId: string): SessionValidationResult;
  initializeAutomaticSeo(): boolean;
  checkSubsystemHealth(): { name: string, status: string, health: number }[];
}

// Adding RecommendedAction interface
export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
  action?: string;
  actionUrl?: string;
  category?: string;
  dismissible?: boolean;
  expiresAt?: string | Date;
}
