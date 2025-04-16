
import { useState } from 'react';
import { Escort } from "@/types/escort";

export const useEscortMedia = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setProfileImage = async (escortId: string, imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Update escort with new profile image
      const updatedEscort = await updateEscortProfile(escortId, {
        avatar: imageUrl,
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
