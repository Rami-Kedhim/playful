
/**
 * Core Systems Types - Shared types for core platform functionalities
 */

export interface RecommendedAction {
  id: string;
  title: string;
  description?: string;
  priority: number;
  action: string | (() => void);
  type?: string;
  dismissible?: boolean;
  expiresAt?: Date;
}

// Add AnalyticsData type for boostService
export interface AnalyticsData {
  impressions: number;
  clicks: number;
  conversion: number;
  position: number;
  additionalViews?: number;
}

// Add ModerateContentParams interface
export interface ModerateContentParams {
  content: string;
  contentType: string;
  strictness?: number;
  userId?: string;
}

export interface ModerateContentResult {
  isApproved: boolean;
  score: number;
  flags: string[];
  message?: string;
}

export interface GenerateContentResult {
  content: string;
  metadata: {
    tokens: number;
    processingTime: number;
  };
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  entities?: {
    name: string;
    sentiment: string;
    confidence: number;
  }[];
}

export interface LucieAISystem {
  moderateContent: (params: ModerateContentParams) => Promise<ModerateContentResult>;
  generateResponse: (prompt: string) => Promise<string>;
  analyzeSentiment: (text: string) => Promise<SentimentAnalysisResult>;
}

export interface SystemStatus {
  operational: boolean;
  services: {
    [key: string]: string;
  };
}

export interface SystemIntegrityResult {
  passed: boolean;
  issues: string[];
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  error?: string;
}

export interface UberCoreSystem {
  initializeAutomaticSeo: () => boolean;
  checkSubsystemHealth: () => Array<{name: string; status: string; health: number}>;
  getSystemStatus: () => {
    operational: boolean;
    isActive: boolean;
    services: {
      auth: string;
      analytics: string;
      ai: string;
      wallet: string;
      seo: string;
    };
    queueLength: number;
    processing: boolean;
    lastUpdate: Date;
  };
  shutdown: () => Promise<boolean>;
}
