
// Core systems type definitions

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
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus(): SystemStatus;
  configure(options: Record<string, any>): void;
  generateResponse(params: GenerateContentParams): Promise<GenerateContentResult>;
}

export interface ModerateContentParams {
  content: string;
  type?: 'text' | 'image' | 'video';
  context?: string;
  severity?: number;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe?: boolean; // For backward compatibility
  score: number;
  issues: string[];
  blockedCategories: string[];
  category?: string;
  action?: string;
}

export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  moderated?: boolean;
  warnings?: string[];
}

export interface SentimentAnalysisParams {
  text: string;
  options?: Record<string, any>;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence?: number; // For backward compatibility
}

export interface OxumSystem {
  calculateScore(data: any): number;
  optimizeBoostPerformance(profile: any): any;
  boostAllocationEigen(matrix: number[][]): number[];
  getSystemStatus(): SystemStatus;
  configure?(options: Record<string, any>): void;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  expiry?: Date;
}

export interface RecommendedAction {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: number;
  action: string;
  actionLabel: string;
  iconName?: string;
}
