
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AIProfile } from '@/types/ai-profile';
import { boostService } from '@/services/boostService';
import { toast } from '@/hooks/use-toast';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';

interface AIProfileBoost {
  profileId: string;
  expiresAt: Date;
  boostLevel: number;
}

interface AIUnlockedContent {
  profileId: string;
  contentIds: string[];
  type: 'image' | 'video' | 'message';
}

interface AIModelMonetizationState {
  balance: number;
  boosts: AIProfileBoost[];
  unlockedContent: AIUnlockedContent[];
  subscriptions: string[];
  unlockImage: (profileId: string, imageId: string) => boolean;
  isImageUnlocked: (profileId: string, imageId: string) => boolean;
  unlockVideo: (profileId: string, videoId: string) => boolean;
  isVideoUnlocked: (profileId: string, videoId: string) => boolean;
  boostProfile: (profileId: string, amount: number, durationHours: number) => Promise<boolean>;
  getProfileBoostLevel: (profileId: string) => number;
  sendMessage: (profileId: string, amount: number) => boolean;
  subscribe: (profileId: string, amount: number) => boolean;
  isSubscribed: (profileId: string) => boolean;
}

const useAIModelMonetizationStore = create<AIModelMonetizationState>()(
  persist(
    (set, get) => ({
      balance: 5000, // Starting balance
      boosts: [],
      unlockedContent: [],
      subscriptions: [],
      
      unlockImage: (profileId, imageId) => {
        const state = get();
        const cost = 25; // Example cost
        
        if (state.balance < cost) {
          toast({
            title: "Insufficient balance",
            description: "You don't have enough UBX to unlock this image",
            variant: "destructive"
          });
          return false;
        }
        
        if (state.isImageUnlocked(profileId, imageId)) {
          return true; // Already unlocked
        }
        
        let found = false;
        const updatedUnlockedContent = [...state.unlockedContent];
        
        // Find existing entry for this profile and type
        for (const entry of updatedUnlockedContent) {
          if (entry.profileId === profileId && entry.type === 'image') {
            entry.contentIds.push(imageId);
            found = true;
            break;
          }
        }
        
        // Create new entry if not found
        if (!found) {
          updatedUnlockedContent.push({
            profileId,
            contentIds: [imageId],
            type: 'image'
          });
        }
        
        set(state => ({
          balance: state.balance - cost,
          unlockedContent: updatedUnlockedContent
        }));
        
        toast({
          title: "Image Unlocked",
          description: "You have successfully unlocked this image"
        });
        
        return true;
      },
      
      isImageUnlocked: (profileId, imageId) => {
        const state = get();
        return state.unlockedContent.some(entry => 
          entry.profileId === profileId && 
          entry.type === 'image' && 
          entry.contentIds.includes(imageId)
        );
      },
      
      unlockVideo: (profileId, videoId) => {
        const state = get();
        const cost = 50; // Example cost
        
        if (state.balance < cost) {
          toast({
            title: "Insufficient balance",
            description: "You don't have enough UBX to unlock this video",
            variant: "destructive"
          });
          return false;
        }
        
        if (state.isVideoUnlocked(profileId, videoId)) {
          return true; // Already unlocked
        }
        
        let found = false;
        const updatedUnlockedContent = [...state.unlockedContent];
        
        // Find existing entry for this profile and type
        for (const entry of updatedUnlockedContent) {
          if (entry.profileId === profileId && entry.type === 'video') {
            entry.contentIds.push(videoId);
            found = true;
            break;
          }
        }
        
        // Create new entry if not found
        if (!found) {
          updatedUnlockedContent.push({
            profileId,
            contentIds: [videoId],
            type: 'video'
          });
        }
        
        set(state => ({
          balance: state.balance - cost,
          unlockedContent: updatedUnlockedContent
        }));
        
        toast({
          title: "Video Unlocked",
          description: "You have successfully unlocked this video"
        });
        
        return true;
      },
      
      isVideoUnlocked: (profileId, videoId) => {
        const state = get();
        return state.unlockedContent.some(entry => 
          entry.profileId === profileId && 
          entry.type === 'video' && 
          entry.contentIds.includes(videoId)
        );
      },
      
      boostProfile: async (profileId, amount, durationHours) => {
        const state = get();
        
        // Check if amount matches the global rate
        if (amount !== GLOBAL_UBX_RATE) {
          toast({
            title: "Price Error",
            description: `The boost price (${amount}) does not match the global rate (${GLOBAL_UBX_RATE})`,
            variant: "destructive"
          });
          return false;
        }
        
        if (state.balance < amount) {
          toast({
            title: "Insufficient balance",
            description: "You don't have enough UBX to boost this profile",
            variant: "destructive"
          });
          return false;
        }
        
        // Calculate boost level based on amount
        const boostLevel = Math.ceil(amount / 20);
        
        // Set expiry date
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + durationHours);
        
        // Remove any existing boost for this profile
        const filteredBoosts = state.boosts.filter(boost => boost.profileId !== profileId);
        
        set(state => ({
          balance: state.balance - amount,
          boosts: [
            ...filteredBoosts,
            {
              profileId,
              expiresAt,
              boostLevel
            }
          ]
        }));
        
        toast({
          title: "Profile Boosted",
          description: `Profile has been boosted for ${durationHours} hours`
        });
        
        return true;
      },
      
      getProfileBoostLevel: (profileId) => {
        const state = get();
        const now = new Date();
        
        // Find boost for this profile that hasn't expired
        const boost = state.boosts.find(b => 
          b.profileId === profileId && 
          new Date(b.expiresAt) > now
        );
        
        return boost ? boost.boostLevel : 0;
      },
      
      sendMessage: (profileId, amount) => {
        const state = get();
        
        if (state.balance < amount) {
          toast({
            title: "Insufficient balance",
            description: "You don't have enough UBX to send this message",
            variant: "destructive"
          });
          return false;
        }
        
        set(state => ({
          balance: state.balance - amount
        }));
        
        return true;
      },
      
      subscribe: (profileId, amount) => {
        const state = get();
        
        if (state.balance < amount) {
          toast({
            title: "Insufficient balance",
            description: "You don't have enough UBX for this subscription",
            variant: "destructive"
          });
          return false;
        }
        
        if (state.isSubscribed(profileId)) {
          toast({
            title: "Already Subscribed",
            description: "You are already subscribed to this model"
          });
          return false;
        }
        
        set(state => ({
          balance: state.balance - amount,
          subscriptions: [...state.subscriptions, profileId]
        }));
        
        toast({
          title: "Subscription Successful",
          description: "You have successfully subscribed to this AI model"
        });
        
        return true;
      },
      
      isSubscribed: (profileId) => {
        const state = get();
        return state.subscriptions.includes(profileId);
      }
    }),
    {
      name: 'ai-model-monetization'
    }
  )
);

export default useAIModelMonetizationStore;
