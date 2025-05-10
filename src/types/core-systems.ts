
export interface GenerateContentParams {
  prompt: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  };
}

export interface GenerateContentResult {
  content: string;
  tokens?: number;
  model?: string;
}

export interface LucieAISystem {
  initialize: () => Promise<boolean>;
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  summarize: (text: string, maxLength?: number) => Promise<string>;
  analyze: (text: string) => Promise<any>;
  extractEntities: (text: string) => Promise<string[]>;
  verifyContentSafety: (text: string) => Promise<boolean>;
}

export interface LucieOrchestrator {
  isSafeContent: (content: string) => Promise<{ safe: boolean; issues?: string[] }>;
  processMessage: (message: string, context?: any) => Promise<string>;
  getResponse: (prompt: string) => Promise<string>;
}

export interface HermesSystem {
  initialize: () => Promise<boolean>;
  trackEvent: (event: string, data: any) => void;
  getMetrics: (profileId: string) => Promise<any>;
}

export interface OxumSystem {
  initialize: () => Promise<boolean>;
  processTransaction: (amount: number, from: string, to: string) => Promise<boolean>;
  getBalance: (userId: string) => Promise<number>;
}

export interface UberCoreSystem {
  initialize: () => Promise<boolean>;
  initializeAutomaticSeo?: () => Promise<boolean>;
  getStatus: () => Promise<{ online: boolean; services: string[] }>;
  lucieAI: LucieAISystem;
  hermes: HermesSystem;
  oxum: OxumSystem;
}
