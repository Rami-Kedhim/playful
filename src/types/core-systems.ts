
// Core systems type definitions

// Lucie AI System
export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  getSystemStatus(): { operational: boolean; modules: Record<string, string> };
  configure(options: Record<string, any>): void;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
}

// Parameters for content moderation
export interface ModerateContentParams {
  content: string;
  strictness?: 'low' | 'medium' | 'high';
  categories?: string[];
  contentType?: 'text' | 'image' | 'video';
  context?: Record<string, any>;
}

// Result of content moderation
export interface ModerateContentResult {
  safe: boolean;
  score: number;
  issues?: string[];
  blockedCategories?: string[];
}

// Result of content generation
export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  originalLength: number;
  moderatedLength: number;
  warnings?: string[];
}

// Result of sentiment analysis
export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

// Recommended action interface
export interface RecommendedAction {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  destination?: string;
  action?: string;
  reason?: string;
}

// Hermes Analytics System
export interface HermesSystem {
  initialize(): Promise<boolean>;
  trackEvent(userId: string, action: string, data?: any): boolean;
  recordUserAction(action: string, metadata?: Record<string, any>): void;
  calculateConversionRate(stats: any): number;
  getSystemStatus(): { operational: boolean; services: Record<string, string> };
  configure(options: Record<string, any>): void;
  routeFlow(from: string, to: string, metadata?: Record<string, any>): void;
}

// Oxum System for blockchain and payments
export interface OxumSystem {
  initialize(): Promise<boolean>;
  processPayment(amount: number, currency: string, userId: string): Promise<boolean>;
  getBalance(userId: string): Promise<number>;
  getTransactionHistory(userId: string): Promise<any[]>;
  getSystemStatus(): { operational: boolean; blockchain: string; network: string };
  recordBoostTransaction(userId: string, amount: number, type: string): Promise<boolean>;
  configure(options: Record<string, any>): void;
}

// Orus System for content management
export interface OrusSystem {
  initialize(): Promise<boolean>;
  storeContent(content: any): Promise<string>;
  retrieveContent(contentId: string): Promise<any>;
  updateContent(contentId: string, updates: any): Promise<boolean>;
  deleteContent(contentId: string): Promise<boolean>;
  getSystemStatus(): { operational: boolean; storage: Record<string, string> };
  configure(options: Record<string, any>): void;
}
