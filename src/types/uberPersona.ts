
export interface UberPersona {
  id: string;
  name: string;
  imageUrl: string;
  traits: {
    intelligence: number;
    creativity: number;
    charisma: number;
    empathy: number;
    assertiveness: number;
  };
  description: string;
  background: string;
  capabilities: string[];
  limitations: string[];
  conversationStyle: string;
  stats: {
    usageCount: number;
    favoriteCount: number;
    averageRating: number;
    totalSessionDuration: number;
  };
  isActive: boolean;
  isLocked?: boolean;
  isPremium?: boolean;
  requiredAccessLevel?: string;
  specialization?: string;
  knowledgeDomains?: string[];
}
