
export interface ModerateContentParams {
  content: string;
  userId?: string;
  strictness?: 'low' | 'medium' | 'high';
  contentType?: string; // Add this to fix BrainCore errors
}

export interface ModerationResult {
  isAppropriate: boolean;
  score: number;
  categories: {
    [key: string]: number;
  };
  message?: string;
}

// Add any other AI-related types here
