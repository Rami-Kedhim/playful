
// Core system types for the application

export interface ModerateContentParams {
  content: string;
  type?: string; // This will be compatible with contentType usage
  contentType?: string; // For backward compatibility
  context?: string;
  userId?: string;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe?: boolean; // For backward compatibility
  reasons?: string[];
  issues?: string[]; // Making this compatible with existing code
  score?: number;
  categories?: Record<string, number>;
  category?: string;
  action?: string;
  blockedCategories?: string[];
}

export interface GenerateContentParams {
  prompt?: string;
  systemPrompt?: string;
  options?: Record<string, any>;
  type?: 'text' | 'image';
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings?: string[];
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface SentimentAnalysisParams {
  text: string;
  language?: string;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
  entities?: Array<{
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }>;
}

export interface SystemStatus {
  operational: boolean;
  isOperational?: boolean;
  isActive?: boolean;
  performance?: number;
  lastUpdate?: string;
  serviceStatus?: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
    payments?: string;
  };
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
  latency?: number;
}

export interface SystemHealthStatus {
  operational: boolean;
  latency?: number;
}

export interface SystemIntegrityResult {
  isValid?: boolean;
  status?: string;
  errors?: string[];
  warnings?: string[];
  lastChecked?: string;
  integrity?: number;
  overallStatus?: string;
  checks?: {
    database: boolean;
    cache: boolean;
    filesystem: boolean;
    network: boolean;
  };
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

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  action?: string;
  priority?: number | 'high' | 'medium' | 'low';
  type?: string;
  completed?: boolean;
  url?: string;
  metadata?: Record<string, any>;
  actionType?: string;
  actionLink?: string;
  createdAt?: string;
}

export interface LucieAISystem {
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  generateResponse(params: GenerateContentParams): Promise<GenerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus?(): SystemStatus;
  initialize?(): Promise<boolean>;
}

export interface OxumSystem {
  initialize(): Promise<void>;
  shutdown(): void;
  getSystemStatus(): SystemStatus;
  processPayment(amount: number, currency: string): Promise<boolean>;
  validateTransaction(txId: string): Promise<boolean>;
  getExchangeRate(from: string, to: string): Promise<number>;
  boostAllocationEigen(userId: string, boostLevel: number): Promise<number[]>;
  calculateScore(inputs: number[]): Promise<number>;
}

export interface UberCoreSystem {
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealthMetrics(): SystemHealthMetrics;
  validateSession(sessionId: string): SessionValidationResult;
}

export interface AnalyticsData {
  impressionsIncrease: number;
  viewsIncrease: number;
  rankingIncrease: number;
  conversionRate: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
}

// For HermesInsight type referenced in useHermesLivecamInsights
export interface HermesInsight {
  type: string;
  title: string;
  description: string;
  data?: any;
  value?: number | string;
  timestamp?: string;
}
