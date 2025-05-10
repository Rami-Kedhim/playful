
export interface HermesInsight {
  id: string;
  timestamp: number;
  category: string;
  content: string;
  confidence: number;
  metadata?: Record<string, any>;
  type?: string; // Adding 'type' to support existing code
}

export interface HermesSystem {
  initialize(): Promise<void>;
  trackEvent(eventName: string, data: any): void;
  getMetrics(): Promise<any>;
  getInsights(): Promise<HermesInsight[]>;
  routeFlow(data: { source: string; destination: string; params: any }): void;
  connect(options: { system: string; connectionId: string; metadata: any; userId: string }): void;
  calculateVisibilityScore(profileId: string): number;
  calculateBoostScore(profileId: string): Promise<number>;
  recommendNextAction(userId: string): { action: string; confidence: number };
}

export interface LucieAISystem {
  initialize(): Promise<void>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeUserBehavior(userId: string, data: any): Promise<any>;
  getSentimentAnalysis(text: string): Promise<SentimentAnalysisResult>;
  predictNextAction(userId: string, context: any): Promise<RecommendedAction>;
}

export interface OxumSystem {
  initialize(): Promise<void>;
  verifySecurityToken(token: string): boolean;
  validateSession(sessionId: string): Promise<SessionValidationResult>;
  calculateScore(data: any): number;
  encryptData(data: any, key?: string): string;
  decryptData(encryptedData: string, key?: string): any;
  getSystemHealth(): SystemHealthMetrics;
}

export interface UberCoreSystem {
  lucieAI: LucieAISystem;
  hermesSystem: HermesSystem;
  oxumSystem: OxumSystem;
  initialize(): Promise<void>;
  checkSubsystemHealth(): Array<{name: string, status: string, health: number}>;
  initializeAutomaticSeo(): {success: boolean, message: string};
}

export interface UberEcosystemContextType {
  hermesSystem?: HermesSystem;
  neuralHub?: any;
  lucieAI?: LucieAISystem;
  initialized: boolean;
  user?: any; // Added to support existing code
  loading?: boolean; // Added to support existing code
}

// Add missing types referenced in errors
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

export interface SystemStatus {
  status: string;
  version: string;
  lastChecked: Date;
  components: Record<string, string>;
}

export interface SystemIntegrityResult {
  valid: boolean;
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  timestamp: Date;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  apiLatency: number;
  activeConnections: number;
  lastUpdated: Date;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  expiresAt?: Date;
  permissions?: string[];
}

export interface RecommendedAction {
  actionType: string;
  confidence: number;
  metadata?: Record<string, any>;
}
