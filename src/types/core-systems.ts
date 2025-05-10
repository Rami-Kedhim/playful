
export interface HermesSystem {
  initialize(): Promise<void>;
  trackEvent(eventName: string, data: any): void;
  getMetrics(): Promise<any>;
  calculateBoostScore(profileId: string): Promise<number>;
  getInsights(): Promise<HermesInsight[]>;
}

export interface HermesInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface LucieAISystem {
  initialize(): Promise<void>;
  getSystemStatus(): any;
  processInput(input: string, context: any): Promise<string>;
}

export interface OxumSystem {
  initialize(): Promise<boolean>;
  processImageFeatures(imageUrl: string): Promise<any>;
  boostAllocationEigen(profileId: string, boostLevel?: number): Promise<number[]>;
  calculateScore(profile: any): Promise<number>;
}

export interface UberCoreSystem {
  lucieAI: LucieAISystem;
  hermesSystem: HermesSystem;
  oxumSystem: OxumSystem;
  initialize(): Promise<void>;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  expiry?: Date;
  reason?: string;
}

export interface SystemIntegrityResult {
  valid: boolean;
  overallStatus: string;
  modules: {
    authentication: string;
    encryption: string;
    validation: string;
  };
  recommendations: string[];
  timestamp: Date;
}
