
export interface UberPersona {
  id: string;
  name: string;
  description: string;
  avatar: string;
  displayName?: string;
  age?: number;
  system?: {
    role?: string;
    context?: string;
  };
  bio?: string;
  roleFlags?: {
    isEscort?: boolean;
    isContentCreator?: boolean;
    isPremium?: boolean;
  };
  capabilities?: Capabilities;
  monetization?: {
    messageCost?: number;
    contentCost?: number;
    subscriptionCost?: number;
    hasSubscription?: boolean;
  };
  contentCount?: number;
}

export interface Capabilities {
  hasChat?: boolean;
  hasLiveStream?: boolean;
  hasVideoCall?: boolean;
  hasContent?: boolean;
  hasVirtualMeets?: boolean;
  hasRealMeets?: boolean;
}

export interface PersonaMessage {
  id: string;
  content: string;
  sender: 'user' | 'persona';
  timestamp: number;
  personaId?: string;
}

export interface PersonaStory {
  id: string;
  title: string;
  thumbnail: string;
  personaId: string;
  createdAt: string;
  isPremium?: boolean;
}

export interface PersonaContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  personaId: string;
  createdAt: string;
  isPremium?: boolean;
  price?: number;
  isUnlocked?: boolean;
}
