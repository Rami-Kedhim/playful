
/**
 * AI systems type definitions
 */

// AI Voice settings
export interface AIVoiceSettings {
  voice: string;
  speed: number;
  pitch: number;
}

// AI User preferences
export interface AIPreferences {
  anonymized: boolean;
  personalizedResponses: boolean;
  adaptivePersonality: boolean;
  rememberConversations: boolean;
  suggestContent: boolean;
  learningEnabled: boolean;
  voiceType?: string;
  voiceSettings?: AIVoiceSettings;
  isEnabled?: boolean;
  [key: string]: boolean | string | number | object | undefined;
}

// AI user context
export interface AIContext {
  preferences: AIPreferences;
  lastInteraction: Date | null;
  conversationCount: number;
  favoriteTopics: string[];
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// AI hook return types
export interface UseAIContextReturn {
  aiContext: AIContext | null;
  isLoading: boolean;
  error: string | null;
  updatePreferences: (preferences: Partial<AIPreferences>) => Promise<void>;
  trackInteraction: (topic?: string) => Promise<void>;
  toggleAI: (enabled: boolean) => Promise<void>;
  resetAIContext: () => Promise<void>;
}

export interface UseAIContextStateReturn {
  aiContext: AIContext | null;
  setAIContext: React.Dispatch<React.SetStateAction<AIContext | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

// Lucie AI types
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

// AI Companion types
export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  emotion?: string;
  visualElements?: Array<{
    data: {
      type: string;
      [key: string]: any;
    }
  }>;
  requiresPayment?: boolean;
  paymentAmount?: number;
  suggestedActions?: string[];
  isPremium?: boolean;
}

export interface AICompanionContact {
  id: string;
  name: string;
  avatar: string;
  lastActive?: string;
  online?: boolean;
  preview?: string;
}

export interface AIContentGenerationParams {
  companion_id: string;
  prompt: string;
  type: 'image' | 'voice' | 'video' | 'text';
  settings?: Record<string, any>;
}

export interface AICompanionConversation {
  id: string;
  companionId: string;
  userId: string;
  messages: CompanionMessage[];
  lastMessage?: string;
  lastActivity: Date;
}

export interface AICompanionRelationshipLevel {
  intimacy: number;
  trust: number;
  attachment: number;
  dominantDynamic: 'submissive' | 'equal' | 'dominant' | null;
  stage: 'stranger' | 'acquaintance' | 'friend' | 'close' | 'intimate';
  lastInteraction: string;
  interactionCount: number; 
}

export interface CompanionProfile {
  id: string;
  name: string;
  avatar_url: string;
  personality?: string;
  description: string;
  visualCapabilities: boolean;
  voice_type: string;
  speechStyle: string;
}

export interface UseAICompanionConversationOptions {
  companionId: string;
  initialMessages?: CompanionMessage[];
}

export interface UseAICompanionConversationResult {
  messages: CompanionMessage[];
  isTyping: boolean;
  isLoading: boolean;
  error: string | null;
  companion: any;
  sendMessage: (content: string) => Promise<void>;
  handleSuggestedActionClick: (action: string) => void;
  generateImage: (prompt: string) => Promise<void>;
  generatingImage: boolean;
  creditCost: number;
}

export interface AICompanionMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  emotionalState?: EmotionalState;
  is_from_user?: boolean;
  created_at?: string;
  attachments?: Array<{
    type: string;
    url: string;
  }>;
}

export type EmotionalState = 
  | 'happy'
  | 'sad'
  | 'angry'
  | 'surprised'
  | 'scared'
  | 'neutral';

// Oxum Learning Service
export interface OxumLearningService {
  initialize: () => Promise<boolean>;
  processInput: (input: string, context?: any) => Promise<string>;
  getLearnedPatterns: () => Promise<string[]>;
  version: string;
  ready: boolean;
}

// System interfaces
export interface LucieAISystem {
  getResponseForPrompt: (prompt: string) => Promise<string>;
  generateContent: (params: any) => Promise<any>;
  moderateContent: (content: string) => Promise<boolean>;
  getSystemStatus: () => {
    modules: {
      aiGeneration: string;
      contentModeration: string;
      sentimentAnalysis: string;
    }
  };
}

export interface UberCoreSystem {
  initialize: () => Promise<boolean>;
  getStatus: () => string;
  registerAction: (actionType: string, data: any) => void;
  recommendNextAction: (userId: string) => any;
}

// Content generation types
export interface GenerateContentResult {
  success: boolean;
  content?: string;
  error?: string;
  metadata?: Record<string, any>;
}

export interface ModerateContentParams {
  text?: string;
  image?: string;
  userId?: string;
  contextType?: 'profile' | 'message' | 'review';
}

export interface ModerateContentResult {
  approved: boolean;
  reasons?: string[];
  score?: number;
  warnings?: string[];
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  emotions: Record<string, number>;
  topics: string[];
}
