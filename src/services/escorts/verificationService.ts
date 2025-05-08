
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  VERIFIED = 'verified',
  PREMIUM = 'premium',
  ELITE = 'elite'
}

export enum VerificationType {
  ID = 'id_verification',
  PHOTO = 'photo_verification',
  VIDEO = 'video_verification',
  BACKGROUND = 'background_check',
  PHONE = 'phone_verification',
  EMAIL = 'email_verification',
  ADDRESS = 'address_verification'
}

export interface VerificationRequest {
  id: string;
  userId: string;
  type: VerificationType;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewerId?: string;
  notes?: string;
  documentUrls?: string[];
  requestedLevel: VerificationLevel;
}

export interface VerificationStatus {
  currentLevel: VerificationLevel;
  pendingRequests: VerificationRequest[];
  latestRequest?: VerificationRequest;
  canRequestVerification: boolean;
  eligibleForNextLevel: boolean;
  nextLevel?: VerificationLevel;
  verifiedAt?: string;
}

class VerificationService {
  async getVerificationStatus(userId: string): Promise<VerificationStatus> {
    try {
      // Implementation would use Supabase in a real app
      // This is a mock implementation
      
      // Simulate API delay
      await new Promise(r => setTimeout(r, 500));
      
      // Randomly determine the user's verification level
      const randomLevel = Math.floor(Math.random() * 5);
      const verificationLevel = Object.values(VerificationLevel)[randomLevel];
      
      const hasPendingRequest = Math.random() > 0.7;
      
      const nextLevelMap: Record<VerificationLevel, VerificationLevel | undefined> = {
        [VerificationLevel.NONE]: VerificationLevel.BASIC,
        [VerificationLevel.BASIC]: VerificationLevel.VERIFIED,
        [VerificationLevel.VERIFIED]: VerificationLevel.PREMIUM,
        [VerificationLevel.PREMIUM]: VerificationLevel.ELITE,
        [VerificationLevel.ELITE]: undefined
      };
      
      return {
        currentLevel: verificationLevel,
        pendingRequests: hasPendingRequest ? [{
          id: `req-${Date.now()}`,
          userId,
          type: VerificationType.ID,
          status: 'pending',
          submittedAt: new Date(Date.now() - (Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
          requestedLevel: nextLevelMap[verificationLevel] || VerificationLevel.BASIC
        }] : [],
        canRequestVerification: !hasPendingRequest && verificationLevel !== VerificationLevel.ELITE,
        eligibleForNextLevel: verificationLevel !== VerificationLevel.ELITE,
        nextLevel: nextLevelMap[verificationLevel],
        verifiedAt: verificationLevel !== VerificationLevel.NONE 
          ? new Date(Date.now() - (Math.random() * 100 * 24 * 60 * 60 * 1000)).toISOString()
          : undefined
      };
    } catch (error) {
      console.error('Error fetching verification status:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch verification status. Please try again later.',
        variant: 'destructive'
      });
      
      // Return default status
      return {
        currentLevel: VerificationLevel.NONE,
        pendingRequests: [],
        canRequestVerification: true,
        eligibleForNextLevel: true,
        nextLevel: VerificationLevel.BASIC
      };
    }
  }
  
  async requestVerification(
    userId: string,
    type: VerificationType,
    requestedLevel: VerificationLevel,
    documents?: File[]
  ): Promise<{ success: boolean; requestId?: string; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(r => setTimeout(r, 1200));
      
      // Simulate file upload to storage if documents are provided
      if (documents?.length) {
        // In a real app, we would upload documents to Supabase Storage
        console.log(`Uploading ${documents.length} documents for verification`);
        
        // Mock upload success
        await new Promise(r => setTimeout(r, 500 * documents.length));
      }
      
      // In a real app, we would create the verification request in the database
      const requestId = `req-${Date.now()}`;
      
      toast({
        title: 'Verification Requested',
        description: 'Your verification request has been submitted for review.',
      });
      
      return {
        success: true,
        requestId
      };
    } catch (error) {
      console.error('Error requesting verification:', error);
      
      toast({
        title: 'Request Failed',
        description: 'Failed to submit verification request. Please try again later.',
        variant: 'destructive'
      });
      
      return {
        success: false,
        error: 'Failed to submit verification request'
      };
    }
  }
  
  async cancelVerificationRequest(requestId: string): Promise<boolean> {
    try {
      // Simulate API delay
      await new Promise(r => setTimeout(r, 800));
      
      toast({
        title: 'Request Cancelled',
        description: 'Your verification request has been cancelled.',
      });
      
      return true;
    } catch (error) {
      console.error('Error cancelling verification request:', error);
      
      toast({
        title: 'Error',
        description: 'Failed to cancel verification request. Please try again.',
        variant: 'destructive'
      });
      
      return false;
    }
  }
  
  getVerificationLevelInfo(level: VerificationLevel): {
    name: string;
    badge: string;
    description: string;
    requirements: string[];
    benefits: string[];
  } {
    const levelInfo = {
      [VerificationLevel.NONE]: {
        name: 'Unverified',
        badge: '⚫',
        description: 'Your profile has not been verified.',
        requirements: ['Create an account', 'Complete your profile'],
        benefits: ['Basic profile access', 'Limited visibility']
      },
      [VerificationLevel.BASIC]: {
        name: 'Basic Verification',
        badge: '🔵',
        description: 'Profile has basic verification.',
        requirements: ['Email verification', 'Phone verification', 'Profile photo'],
        benefits: ['Increased visibility', 'Basic search ranking', 'Contact clients']
      },
      [VerificationLevel.VERIFIED]: {
        name: 'Verified',
        badge: '✓',
        description: 'Profile is verified with ID check.',
        requirements: ['Government ID', 'Selfie photo', 'Address verification'],
        benefits: ['Verified badge', 'Enhanced visibility', 'Premium search ranking']
      },
      [VerificationLevel.PREMIUM]: {
        name: 'Premium Verified',
        badge: '🥇',
        description: 'Premium verification with background check.',
        requirements: ['Background check', 'Reference check', 'Video verification'],
        benefits: ['Premium badge', 'Top search visibility', 'Featured profile opportunities']
      },
      [VerificationLevel.ELITE]: {
        name: 'Elite Verified',
        badge: '⭐',
        description: 'The highest level of verification.',
        requirements: ['Premium verification', 'In-person verification', 'Extended background check'],
        benefits: ['Elite badge', 'Featured placement', 'Priority support', 'Special promotions']
      }
    };
    
    return levelInfo[level];
  }
}

export const verificationService = new VerificationService();
export default verificationService;
