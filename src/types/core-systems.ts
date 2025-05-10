
export interface HermesInsight {
  id: string;
  timestamp: number;
  category: string;
  content: string;
  confidence: number;
  metadata?: Record<string, any>;
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

export interface UberEcosystemContextType {
  hermesSystem?: HermesSystem;
  neuralHub?: any;
  lucieAI?: any;
  initialized: boolean;
}
