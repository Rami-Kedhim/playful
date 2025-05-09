
export interface SystemStatus {
  online: boolean;
  uptime: number;
  performance: number;
  lastChecked: Date;
  isActive?: boolean; // Add this property to fix errors
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  latency: number;
}

// Alias for use in components
export type SystemHealthMetrics = SystemMetrics;

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  expiresAt?: Date;
  valid?: boolean; // Add this property to fix errors
}

export interface SystemIntegrityResult {
  status: boolean;
  timestamp: Date;
  details?: string;
  valid?: boolean; // Add this property to fix errors
  integrity?: boolean; // Add this property to fix errors
}

export interface HermesSystem {
  getInsights(): Promise<HermesInsight[]>;
  processFeedback(userId: string, data: any): Promise<boolean>;
  calculateVisibilityScore(profileId: string): Promise<number>;
  // Add other methods used by components
}

export interface HermesInsight {
  id: string;
  userId: string;
  type: string;
  content: string;
  timestamp: Date;
  score?: number;
}

export interface OxumSystem {
  getSystemStatus(): Promise<SystemStatus>;
  validateSession(sessionId: string): Promise<SessionValidationResult>;
  checkIntegrity(): Promise<SystemIntegrityResult>;
  // Add other methods used by components
}

export interface UberCoreSystem {
  initialize(): Promise<boolean>;
  validateSession(userId: string): SessionValidationResult;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemMetrics(): SystemMetrics;
  // Add other methods used by components
}

export interface LucieAISystem {
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  // Add other methods used by components
}

export interface GenerateContentParams {
  prompt: string;
  context?: any;
  length?: number;
  temperature?: number;
}

export interface GenerateContentResult {
  content: string;
  tokens: number;
  success: boolean;
  error?: string;
}

export interface ModerateContentParams {
  content: string;
  user_id?: string;
  context?: string;
}

export interface ModerateContentResult {
  approved: boolean;
  score: number;
  reasons?: string[];
  success: boolean;
}

export interface SentimentAnalysisParams {
  content: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  details?: Record<string, number>;
  success: boolean;
}
