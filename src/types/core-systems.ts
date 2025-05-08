
// Core Systems Type Definitions

// LucieAI System Types
export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
  getSystemStatus(): { operational: boolean; modules: Record<string, string> };
  configure(options: Record<string, any>): void;
}

export interface ModerateContentParams {
  content: string;
  contentType: 'text' | 'image' | 'video';
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

// UberCore System Types
export interface UberCoreSystem {
  initialize(): Promise<boolean>;
  shutdown(): Promise<void>;
  checkSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealth(): SystemHealthMetrics;
  validateUserSession(token: string): SessionValidationResult;
}

export interface SystemStatus {
  operational: boolean;
  latency?: number;
  messageLength?: number;
  uptime?: number;
  services?: Record<string, string>;
  status?: string;
}

export interface SystemIntegrityResult {
  isValid: boolean;
  message: string;
  details?: Record<string, any>;
  timestamp?: Date;
}

export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
  systemLoad: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  expiry?: Date;
}
