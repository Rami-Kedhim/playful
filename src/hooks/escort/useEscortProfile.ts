
import { Escort, ServiceType } from "@/types/escort";
import { useEscortProfileState } from "./useEscortProfileState";
import { useEscortProfileFetch } from "./useEscortProfileFetch";
import { useEscortProfileMutation } from "./useEscortProfileMutation";
import { useEscortServices } from "./useEscortServices";
import { useEscortMedia } from "./useEscortMedia";

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
    createEscortProfile,
    updateEscortProfile,
    
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
