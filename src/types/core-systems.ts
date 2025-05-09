
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
}

export interface HermesSystem {
  trackEvent(actionType: string, data: Record<string, any>): void;
  getInsights(profileId: string): Promise<HermesInsight[]>;
}
