
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
  cards?: InteractiveCard[];
}

export interface InteractiveCard {
  title: string;
  description?: string;
  imageUrl?: string;
  actions: CardAction[];
}

export interface CardAction {
  label: string;
  action: string;
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
  cards?: InteractiveCard[];
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
