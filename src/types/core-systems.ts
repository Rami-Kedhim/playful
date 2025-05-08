
// Core system types

export interface SystemStatus {
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
  uptime: number;
  lastReboot: string;
  messageLength?: number; // Make this optional for compatibility
}

export interface SystemIntegrityResult {
  isValid: boolean; // Changed from valid to isValid for compatibility
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
  load?: number; // Make this optional for compatibility
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  username: string;
  timestamp: string;
  sessionId?: string; // Add for compatibility
  expiresAt?: string; // Add for compatibility
}

export interface ModerateContentParams {
  content: string;
  context?: string; // Add for compatibility
  userId?: string;
  strictMode?: boolean;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe?: boolean; // Add for compatibility
  issues?: string[]; // Add for compatibility
  blockedCategories?: string[]; // Add for compatibility
  score: number;
  category: string;
  action: string;
}

export interface GenerateContentParams {
  prompt: string;
  context?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GenerateContentResult {
  content: string;
  moderated?: boolean; // Add for compatibility
  tokens: number;
  model: string;
  finishReason: string;
}

export interface SentimentAnalysisParams {
  text: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence?: number; // Add for compatibility
  score: number;
  keywords?: string[];
}

export interface LucieAISystem {
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  generateResponse(params: GenerateContentParams): Promise<GenerateContentResult>;
  getSystemStatus(): SystemStatus; // Add for compatibility
}

export interface OxumSystem {
  calculateScore(data: any): number;
  optimizeBoostPerformance(profile: any): any;
  checkSystemStatus(): SystemStatus; // Add for compatibility
}
