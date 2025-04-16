
import { useState } from 'react';
import { Escort } from '@/types/escort';

export const useGalleryManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const addGalleryImage = async (escortId: string, imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current escort data first
      const escort = await updateEscortProfile(escortId, {});
      
      if (!escort) {
        throw new Error('Escort not found');
      }
      
      // Add image to gallery
      const currentGallery = escort.gallery || [];
      const updatedGallery = [...currentGallery, imageUrl];
      
      // Update escort with new gallery
      const updatedEscort = await updateEscortProfile(escortId, {
        gallery: updatedGallery
      });
      
      return updatedEscort;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add image to gallery';
      setError(errorMessage);
      console.error('Error adding gallery image:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeGalleryImage = async (escortId: string, imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current escort data first
      const escort = await updateEscortProfile(escortId, {});
      
      if (!escort) {
        throw new Error('Escort not found');
      }
      
      // Remove the image from gallery
      const currentGallery = escort.gallery || [];
      const updatedGallery = currentGallery.filter(img => img !== imageUrl);
      
      // Update escort with new gallery
      const updatedEscort = await updateEscortProfile(escortId, {
        gallery: updatedGallery
      });
      
      return updatedEscort;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove image from gallery';
      setError(errorMessage);
      console.error('Error removing gallery image:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    addGalleryImage,
    removeGalleryImage,
    isLoading,
    error
  };
};
