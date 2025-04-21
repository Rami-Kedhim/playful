
// Fix typing of Partial<Escort> updates to include only valid keys, removing avatar field and use profileImage etc correctly

import { useState } from 'react';
import { Escort } from '@/types/Escort';

export const useProfileImageManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setProfileImage = async (escortId: string, imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Update escort with new profile image fields only
      const updatedEscort = await updateEscortProfile(escortId, {
        profileImage: imageUrl,
        imageUrl: imageUrl // Update all image-related fields
      });
      
      return updatedEscort;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set profile image';
      setError(errorMessage);
      console.error('Error setting profile image:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    setProfileImage,
    isLoading,
    error
  };
};
