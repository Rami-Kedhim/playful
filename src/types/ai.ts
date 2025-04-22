
export interface AIProfile {
  id: string;
  name: string;
  avatar: string;
  description: string;
  personality: string;
  interests: string[];
  language: string; // Added this property to fix the error
  age?: number;
  location?: string;
  gender?: string;
  status?: string;
  createdAt: Date | string;
  modelType?: string;
  chatHistory?: Array<{ role: string; content: string }>;
}

export interface AIGenerationOptions {
  gender?: string;
  age?: number;
  personality?: string;
  interests?: string[];
  language?: string;
}
