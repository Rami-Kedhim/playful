
export interface UberPersona {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  personality?: string;
  backstory?: string;
  capabilities?: string[];
  isAI?: boolean;
  status?: 'active' | 'inactive' | 'training';
  createdAt?: Date;
  updatedAt?: Date;
  languageModel?: string;
  personality_traits?: string[];
}
