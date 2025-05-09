
export interface SystemStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  lastUpdated: Date;
  performance: number;
  isActive?: boolean; // Add this property which was missing
}

export interface SessionValidationResult {
  valid: boolean; // Change isValid to valid
  sessionId?: string;
  userId?: string;
  expiresAt?: Date;
  permissions?: string[];
  details?: Record<string, any>;
}

export interface SystemIntegrityResult {
  valid: boolean; // Change isValid to valid
  score: number; // Use score instead of integrity
  checks: {
    codeIntegrity: boolean;
    dataIntegrity: boolean;
    networkSecurity: boolean;
  };
  timestamp: Date;
  details?: Record<string, any>;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
  uptime: number;
  requests: number;
  errors: number;
  latency: number;
  timestamp: Date;
}

export type SystemHealthMetrics = SystemMetrics;

export interface HermesSystem {
  calculateVisibilityScore: (userId: string) => Promise<number>;
  getRecommendedContent: (userId: string) => Promise<any[]>;
  trackUserActivity: (userId: string, activity: string) => Promise<void>;
  optimize: (target: string) => Promise<boolean>;
  connect: (options: any) => void;
  disconnect: () => void;
}

export interface HermesInsight {
  type: string;
  score: number;
  confidence: number;
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface LucieAISystem {
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  moderateContent: (params: ModerateContentParams) => Promise<ModerateContentResult>;
  analyzeSentiment: (params: SentimentAnalysisParams) => Promise<SentimentAnalysisResult>;
}

export interface GenerateContentParams {
  prompt: string;
  context?: Record<string, any>;
  options?: {
    maxLength?: number;
    temperature?: number;
    format?: 'text' | 'json' | 'markdown';
  };
}

export interface GenerateContentResult {
  content: string;
  metadata: {
    tokens: number;
    processingTime: number;
    model: string;
    usage: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
  };
}

export interface ModerateContentParams {
  content: string;
  context?: Record<string, any>;
  options?: {
    strictness?: number;
    categories?: string[];
  };
}

export interface ModerateContentResult {
  approved: boolean;
  flags: {
    sexual: number;
    violence: number;
    hate: number;
    selfHarm: number;
    harassment: number;
  };
  reasons: string[];
  metadata: Record<string, any>;
}

export interface SentimentAnalysisParams {
  text: string;
  options?: {
    detailed?: boolean;
    language?: string;
  };
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  score: number;
  confidence: number;
  emotions?: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
  };
  metadata: Record<string, any>;
}

export interface OxumSystem {
  calculateBoostScore: (profileId: string) => Promise<number>;
  getProfileRanking: (profileId: string) => Promise<number>;
  optimizeVisibility: (profileId: string, boostLevel: number) => Promise<boolean>;
}

export interface UberCoreSystem {
  validateSession: (sessionId: string) => Promise<SessionValidationResult>;
  checkSystemIntegrity: () => Promise<SystemIntegrityResult>;
  getSystemMetrics: () => Promise<SystemMetrics>;
  registerSystem: (system: string, instance: any) => void;
  deregisterSystem: (system: string) => void;
}
