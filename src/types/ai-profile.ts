
export interface AIProfile {
  id: string;
  name: string;
  avatar_url?: string;
  avatarUrl?: string;
  personality?: {
    type: 'flirty' | 'shy' | 'dominant' | 'playful' | string;
    traits?: string[];
  };
  location?: string;
  lucoin_chat_price?: number;
  lucoin_image_price?: number;
  interests?: string[];
  availability_status?: string;
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
    boost_level?: number;
  };
  isVerified?: boolean;
}
