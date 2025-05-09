export interface HermesInsight {
  type: string;
  title: string;
  description: string;
  value: number;
  change?: number;
  data?: any;
}

export interface LucieAISystem {
  initialize(): Promise<void>;
  generateContent(prompt: string, options?: any): Promise<GenerateContentResult>;
  shutdown(): Promise<void>;
  moderateContent?(params: any): Promise<any>;
  analyzeSentiment?(params: any): Promise<any>;
  getSystemStatus?(): any;
}

export interface GenerateContentResult {
  content: string;
  tokens: number;
  moderated?: boolean;
  moderationFlags?: string[];
}

export interface OxumSystem {
  initialize(): Promise<boolean>;
  boostAllocationEigen(profileId: string, boostLevel: number): Promise<number[]>;
  calculateScore?(inputs: number[]): Promise<number>;
}

export interface HermesSystem {
  trackEvent(actionType: string, data: Record<string, any>): void;
  getInsights(profileId: string): Promise<HermesInsight[]>;
}

export interface ModerateContentParams {
  content: string;
  type: 'text' | 'image' | 'video';
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe: boolean;
  score: number;
  issues: string[];
  blockedCategories: string[];
  category: string;
  action: string;
}

export interface SentimentAnalysisParams {
  text: string;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: string;
  confidence: number;
}

export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}
