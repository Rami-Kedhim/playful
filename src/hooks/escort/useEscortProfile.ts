import { Escort, ServiceType } from "@/types/escort";
import { useEscortProfileState } from "./useEscortProfileState";
import { useEscortProfileFetch } from "./useEscortProfileFetch";
import { useEscortProfileMutation } from "./useEscortProfileMutation";
import { useEscortServices } from "./useEscortServices";
import { useEscortMedia } from "./useEscortMedia";
import { toast } from "@/components/ui/use-toast";

/**
 * Main hook for escort profile management.
 * Combines state, fetching, mutation, service management, and media functionality.
 */
export const useEscortProfile = (escortId?: string) => {
  // Get state management functions
  const { 
    escort, setEscort, 
    loading, setLoading, 
    saving, setSaving, 
    error, setError 
  } = useEscortProfileState();

  // Get profile fetching functions
  const { fetchEscortProfile } = useEscortProfileFetch(setEscort, setLoading, setError);

  // Get profile mutation functions
  const { createEscortProfile, updateEscortProfile } = useEscortProfileMutation(
    setEscort, 
    setSaving, 
    setError
  );

  // Get service management functions
  const serviceManagement = useEscortServices(updateEscortProfile);

  // Get media management functions
  const mediaManagement = useEscortMedia(updateEscortProfile);

  /**
   * Fetch the escort profile if escortId is provided
   */
  const loadEscortProfile = async () => {
    if (!escortId) {
      setError("Escort ID is required to load profile");
      return null;
    }
    
    try {
      const profile = await fetchEscortProfile(escortId);
      return profile;
    } catch (err) {
      console.error("Error in loadEscortProfile:", err);
      return null;
    }
  };

  /**
   * Update basic escort profile information
   */
  const updateBasicInfo = async (id: string, updates: Partial<Escort>) => {
    if (!id) {
      toast({
        title: "Error updating profile",
        description: "Profile ID is required",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      return await updateEscortProfile(id, updates);
    } catch (err) {
      console.error("Error updating basic info:", err);
      return null;
    }
  };

  /**
   * Update contact information
   */
  const updateContactInfo = async (id: string, contactInfo: Escort['contactInfo']) => {
    if (!id) {
      toast({
        title: "Error updating contact info",
        description: "Profile ID is required",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      return await updateEscortProfile(id, { contactInfo });
    } catch (err) {
      console.error("Error updating contact info:", err);
      return null;
    }
  };

  /**
   * Update physical attributes
   */
  const updatePhysicalAttributes = async (
    id: string, 
    attributes: Partial<Pick<Escort, 'height' | 'weight' | 'measurements' | 'hairColor' | 'eyeColor' | 'ethnicity'>>
  ) => {
    if (!id) {
      toast({
        title: "Error updating attributes",
        description: "Profile ID is required",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      return await updateEscortProfile(id, attributes);
    } catch (err) {
      console.error("Error updating physical attributes:", err);
      return null;
    }
  };

  // Wrapper functions to pass the escort to service functions
  const addService = (id: string, service: ServiceType) => 
    serviceManagement.addService(id, service, escort);
  
  const removeService = (id: string, service: ServiceType) => 
    serviceManagement.removeService(id, service, escort);

  // Wrapper functions to pass the escort to media functions
  const addGalleryImage = (id: string, imageUrl: string) => 
    mediaManagement.addGalleryImage(id, imageUrl, escort);
  
  const removeGalleryImage = (id: string, imageUrl: string) => 
    mediaManagement.removeGalleryImage(id, imageUrl, escort);
  
  const addVideo = (id: string, videoUrl: string) => 
    mediaManagement.addVideo(id, videoUrl, escort);
  
  const removeVideo = (id: string, videoUrl: string) => 
    mediaManagement.removeVideo(id, videoUrl, escort);

  return {
    // State
    escort,
    loading,
    saving,
    error,
    
    // Profile operations
    fetchEscortProfile,
    loadEscortProfile,
    createEscortProfile,
    updateEscortProfile,
    
    // Profile update convenience methods
    updateBasicInfo,
    updateContactInfo,
    updatePhysicalAttributes,
    
    // Service operations
    addService,
    removeService,
    updateRates: serviceManagement.updateRates,
    updateAvailability: serviceManagement.updateAvailability,
    
    // Media operations
    addGalleryImage,
    removeGalleryImage,
    setProfileImage: mediaManagement.setProfileImage,
    addVideo,
    removeVideo
  };
};

export default useEscortProfile;
