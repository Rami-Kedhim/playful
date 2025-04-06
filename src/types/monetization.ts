
import { AIProfile, AIGift, AIBoost } from "@/types/ai-profile";

// Core interfaces for monetization
export interface ContentPurchase {
  contentId: string;
  profileId: string;
  price: number;
}

export interface ImageUnlockParams {
  profileId: string;
  imageUrl: string;
  price: number;
}

export interface VideoUnlockParams {
  profileId: string;
  videoId: string;
  price: number;
}

export interface BoostParams {
  profileId: string;
  amount: number;
  durationHours: number;
}

export interface GiftParams {
  profileId: string;
  giftType: string;
  amount: number;
}
