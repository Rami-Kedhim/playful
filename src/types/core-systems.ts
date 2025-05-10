
// Core Systems Types
export interface SystemStatus {
  status: string;
  modules?: Record<string, string>;
}

export interface SystemIntegrityResult {
  isValid: boolean;
  overallStatus: string;
  modules?: Record<string, string>;
  recommendations?: string[];
  timestamp: Date | string;
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  overall: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  expiry?: Date;
  reason?: string;
}

export interface ModerateContentParams {
  content: string;
  contentType: string;
  strictness?: number;
}

export interface ModerateContentResult {
  approved: boolean;
  reason?: string;
  score: number;
  flags?: string[];
}

export interface GenerateContentParams {
  prompt: string;
  maxLength?: number;
  temperature?: number;
  format?: string;
}

export interface GenerateContentResult {
  content: string;
  metadata?: Record<string, any>;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export interface RecommendedAction {
  actionType: string;
  confidence: number;
  metadata?: Record<string, any>;
}

export interface HermesInsight {
  id?: string;
  title: string;
  content: string;
  timestamp: Date;
  category: string;
  type?: string;
  confidence: number;
  related?: string[];
}

// Core system interfaces
export interface LucieAISystem {
  initialize(): Promise<void>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeUserBehavior(userId: string, data: any): Promise<any>;
  getSentimentAnalysis(text: string): Promise<SentimentAnalysisResult>;
  predictNextAction(userId: string, context: any): Promise<RecommendedAction>;
}

export interface HermesSystem {
  initialize(): Promise<void>;
  trackEvent(eventName: string, data: any): void;
  getMetrics(): Promise<any>;
  getInsights(): Promise<HermesInsight[]>;
  calculateBoostScore(profileId: string): Promise<number>;
}

export interface OxumSystem {
  initialize(): Promise<boolean>;
  processImageFeatures(imageUrl: string): Promise<any>;
  validateSession(token: string): Promise<boolean>;
  checkPermission(userId: string, resource: string, action: string): Promise<boolean>;
  boostAllocationEigen(profileId: string, boostLevel: number): Promise<any>;
}

export interface UberCoreSystem {
  lucieAI: LucieAISystem;
  hermesSystem: HermesSystem;
  oxumSystem: OxumSystem;
  initialize(): Promise<void>;
  checkSubsystemHealth(): any[];
  initializeAutomaticSeo(): { success: boolean; message: string };
}
