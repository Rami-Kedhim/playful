
export interface LucieMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
  emotion?: string;
  visualElements?: {
    type: 'image' | 'card';
    data: any;
  }[];
}

export interface UserContext {
  name?: string;
  role?: string;
  recentActivity?: string;
  interests?: string[];
}

export interface LucieResponse {
  text: string;
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
  emotion?: string;
}

export interface LucieAPIOptions {
  apiAvailable: boolean;
  retryCount: number;
  lastRequestTime: number | null;
  apiBackoffTime: number;
}

export interface VisualElementRequest {
  type: string;
  content: any;
}
