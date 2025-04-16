
import { useState } from 'react';
import { Escort } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';
import { escortService } from '@/services/escorts/escortService';

/**
 * Hook to manage escort profile data
 */
export const useEscortProfile = (initialEscort?: Escort) => {
  const [escort, setEscort] = useState<Escort | null>(initialEscort || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  /**
   * Fetch escort profile by ID
   */
  const fetchEscortProfile = async (id: string) => {
    try {
      setIsLoading(true);
      const data = await escortService.getEscortById(id);
      
      if (data) {
        setEscort(data);
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching escort profile:', error);
      toast({
        title: "Error",
        description: "Failed to load escort profile",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Update escort profile data
   */
  const updateEscortProfile = async (id: string, updates: Partial<Escort>) => {
    try {
      setIsSaving(true);
      const updatedEscort = await escortService.updateEscortProfile(id, updates);
      
      if (updatedEscort) {
        setEscort(updatedEscort);
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated",
        });
        return updatedEscort;
      }
      return null;
    } catch (error) {
      console.error('Error updating escort profile:', error);
      toast({
        title: "Update Failed",
        description: "Could not update your profile information",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };
  
  /**
   * Update contact information
   */
  const updateContactInfo = async (id: string, contactInfo: {
    email?: string;
    phone?: string;
    website?: string;
    social?: Record<string, string>;
  }) => {
    return updateEscortProfile(id, { 
      contactInfo: contactInfo 
    });
  };
  
  return {
    escort,
    isLoading,
    isSaving,
    fetchEscortProfile,
    updateEscortProfile,
    updateContactInfo
  };
};
