
import { Escort, ServiceType } from "@/types/escort";
import { useEscortProfileState } from "./useEscortProfileState";
import { useEscortProfileFetch } from "./useEscortProfileFetch";
import { useEscortProfileMutation } from "./useEscortProfileMutation";
import { useEscortServices } from "./useEscortServices";

/**
 * Main hook for escort profile management.
 * Combines state, fetching, mutation, and service management functionality.
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

  // Wrapper functions to pass the escort to service functions
  const addService = (id: string, service: ServiceType) => 
    serviceManagement.addService(id, service, escort);
  
  const removeService = (id: string, service: ServiceType) => 
    serviceManagement.removeService(id, service, escort);

  return {
    escort,
    loading,
    saving,
    error,
    fetchEscortProfile,
    createEscortProfile,
    updateEscortProfile,
    addService,
    removeService,
    updateRates: serviceManagement.updateRates,
    updateAvailability: serviceManagement.updateAvailability
  };
};

export default useEscortProfile;
