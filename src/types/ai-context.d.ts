
export interface AIContext {
  currentEmotion?: string;
  lastInteraction?: Date;
  userPreferences?: Record<string, unknown>;
  contextHistory?: Array<{
    timestamp: Date;
    action: string;
    data?: unknown;
  }>;
}
