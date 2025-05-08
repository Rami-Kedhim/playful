
export interface ModerateContentParams {
  content: string;
  contentType: string;
  context: Record<string, any>;
}

export interface ModerateContentResult {
  safe: boolean;
  score: number;
  issues: string[];
  blockedCategories: string[];
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  originalLength: number;
  moderatedLength: number;
  warnings: string[];
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
  getSystemStatus(): { operational: boolean; modules: Record<string, string> };
  configure(options: Record<string, any>): void;
}

export interface SystemStatus {
  operational: boolean;
  messageLength?: number;
  latency?: number;
  uptime?: number;
  services: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    [key: string]: string;
  };
}

export interface SystemIntegrityResult {
  isValid: boolean;
  message: string;
  details: {
    database: string;
    fileSystem: string;
    network: string;
    [key: string]: string;
  };
}

export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  systemLoad?: number;
  requestRate?: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  expiry?: Date;
  reason?: string;
}

export interface UberCoreSystem {
  initialize(): Promise<boolean>;
  shutdown(): Promise<void>;
  checkSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealth(): SystemHealthMetrics;
  validateUserSession(token: string): SessionValidationResult;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: number;
  action: string | (() => void);
}

// Update the BoostAnalytics interface to include the missing properties
export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  // Add these new properties to match usage in useBoostOperations
  views?: number;
  impressions?: {
    value: number;
    change?: number;
  };
  interactions?: {
    value: number;
    change?: number;
  };
}
