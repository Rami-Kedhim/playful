
// Core system type definitions

// UberCore
export interface UberCoreSystem {
  initialize: () => Promise<boolean>;
  initializeAutomaticSeo: () => Promise<boolean>;
  getStatus: () => Promise<{ online: boolean; services: string[] }>;
  checkSubsystemHealth: () => SubsystemHealth[];
  lucieAI: LucieAISystem;
  hermes: HermesSystem;
  oxum: OxumSystem;
}

export interface SubsystemHealth {
  name: string;
  status: 'Online' | 'Offline' | 'Degraded';
  health: number;
}

// Lucie AI System
export interface LucieAISystem {
  name: string;
  version: string;
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  moderateContent?: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  analyzeSentiment?: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  summarize?: (text: string) => Promise<string>;
  analyze?: (text: string) => Promise<any>;
  extractEntities?: (text: string) => Promise<any>;
  verifyContentSafety?: (content: string) => Promise<boolean>;
}

export interface GenerateContentParams {
  prompt: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GenerateContentResult {
  content: string;
  tokensUsed: number;
  truncated: boolean;
}

export type ModerateContentParams = GenerateContentParams;
export type ModerateContentResult = GenerateContentResult & { rating?: 'safe' | 'unsafe' | 'sensitive' };
export type SentimentAnalysisParams = GenerateContentParams;
export type SentimentAnalysisResult = GenerateContentResult;

// Hermes System
export interface HermesSystem {
  name: string;
  version: string;
  calculateBoostScore: (profileId: string) => Promise<number>;
  calculateVisibilityScore: (profileId: string) => Promise<number>;
  getInsights: () => Promise<HermesInsight[]>;
  recommendContent: (userId: string) => Promise<string[]>;
  routeFlow: (userId: string, destination: string) => Promise<{ safe: boolean; reason?: string }>;
  initialize: () => Promise<boolean>;
  trackEvent: (eventName: string, data: any) => void;
  getMetrics: () => Promise<any>;
}

export interface HermesInsight {
  type: string;
  description: string;
  confidence: number;
  data: any;
}

// Oxum System
export interface OxumSystem {
  name: string;
  version: string;
  processImageFeatures: (imageUrl: string) => Promise<any>;
  boostAllocationEigen: (profileId: string, level: number) => Promise<number[]>;
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  getBoostStatus: (profileId: string) => Promise<any>;
  initialize: () => Promise<boolean>;
}

// System status and integrity
export interface SystemStatus {
  status: 'operational' | 'degraded' | 'offline';
  version: string;
  lastChecked: Date;
  components: {
    security: 'operational' | 'degraded' | 'offline';
    core: 'operational' | 'degraded' | 'offline';
    [key: string]: 'operational' | 'degraded' | 'offline';
  };
}

export interface SystemIntegrityResult {
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  timestamp: Date;
  valid: boolean;
}

// Boost Analytics
export interface BoostAnalytics {
  profileId: string;
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  viewsBeforeBoost?: number;
  viewsAfterBoost?: number;
  engagementIncrease?: number;
  impressions?: {
    value: number;
    change?: number;
  };
  interactions?: {
    value: number;
    change?: number;
  };
  views?: number;
  additionalViews?: number;
}
