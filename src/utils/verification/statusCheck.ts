
import { VerificationLevel, VerificationStatus } from '@/types/verification';

/**
 * Get the current verification status for a user
 * @param userId User ID to check
 * @returns Promise with verification status details
 */
export const checkVerificationStatus = async (userId: string): Promise<{
  status: VerificationStatus;
  level: VerificationLevel | null;
  lastSubmitted: Date | null;
  reason?: string;
}> => {
  try {
    // In a real app, this would be an API call to check the status
    // For now, mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // This is where you would typically make an API call to get the status
    // For demonstration, we'll return mock data
    return {
      status: VerificationStatus.NONE,
      level: null,
      lastSubmitted: null
    };
  } catch (error) {
    console.error('Error checking verification status:', error);
    return {
      status: VerificationStatus.NONE,
      level: null,
      lastSubmitted: null,
      reason: 'Failed to check verification status'
    };
  }
};

/**
 * Get verification level requirements
 * @param targetLevel Target verification level
 * @returns Object with requirements for the level
 */
export const getVerificationRequirements = (targetLevel: VerificationLevel) => {
  switch (targetLevel) {
    case VerificationLevel.BASIC:
      return {
        documents: ['id_card', 'passport', 'drivers_license'],
        needsSelfie: true,
        needsAddress: false,
        fee: 0
      };
    case VerificationLevel.ENHANCED:
      return {
        documents: ['id_card', 'passport', 'drivers_license'],
        needsSelfie: true,
        needsAddress: true,
        fee: 5
      };
    case VerificationLevel.PREMIUM:
      return {
        documents: ['passport', 'drivers_license'],
        needsSelfie: true,
        needsAddress: true,
        needsVideoCall: true,
        fee: 15
      };
    default:
      return {
        documents: [],
        needsSelfie: false,
        needsAddress: false,
        fee: 0
      };
  }
};
