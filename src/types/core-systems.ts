
export interface SystemStatus {
  isActive?: boolean;
  lastCheckTime: Date;
  componentStatus: Record<string, boolean>;
}

export interface SystemMetrics {
  uptime: number;
  requestsPerSecond: number;
  averageResponseTime: number;
  errorRate: number;
}

export type SystemHealthMetrics = SystemMetrics;

export interface SessionValidationResult {
  valid: boolean;
  expires?: Date;
  userId?: string;
  sessionId?: string;
}

export interface SystemIntegrityResult {
  integrity: boolean;
  details: {
    filesChecked: number;
    corruptionDetected: boolean;
    unauthorized: boolean;
  };
}

export interface HermesSystem {
  calculateTimeImpact(currentHour?: number): number;
  calculateVisibilityScore(startScore: number, timeSinceLastTop: number): number;
  updateSystemLoad(load: number): void;
}

export interface HermesInsight {
  timestamp: Date;
  score: number;
  recommendation: string;
}

export interface OxumSystem {
  addNode(nodeId: string, weight: number): boolean;
  removeNode(nodeId: string): boolean;
  calculateNodeValue(nodeId: string): number;
  balanceNetwork(): void;
}

export interface UberCoreSystem {
  validateSession(token: string): Promise<SessionValidationResult>;
  checkSystemIntegrity(): Promise<SystemIntegrityResult>;
  getSystemMetrics(): SystemMetrics;
}

export interface LucieAISystem {
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
}

export interface GenerateContentParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  format?: 'text' | 'json' | 'html';
}

export interface GenerateContentResult {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ModerateContentParams {
  content: string;
  categories?: string[];
  threshold?: number;
}

export interface ModerateContentResult {
  flagged: boolean;
  categories: Record<string, number>;
  overall_score: number;
  action_recommended: string;
}

export interface SentimentAnalysisParams {
  text: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  details?: {
    emotions: Record<string, number>;
    topics: string[];
    intent: string;
  };
}
