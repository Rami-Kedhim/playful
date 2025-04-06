import { useState, useCallback } from "react";
import { Escort, ServiceType } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for managing escort services
 */
export const useEscortServices = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  /**
   * Adds a service to the escort's profile
   */
  const addService = useCallback(async (id: string, service: ServiceType, escort?: Escort | null) => {
    if (!id) {
      toast({
        title: "Error adding service",
        description: "Profile ID is required",
        variant: "destructive",
      });
      return null;
    }
    
    if (!escort) {
      toast({
        title: "Error adding service",
        description: "Escort profile is required",
        variant: "destructive",
      });
      return null;
    }
    
    const updatedServices = [...(escort.services || []), service];
    
    try {
      return await updateEscortProfile(id, { services: updatedServices });
    } catch (err) {
      console.error("Error adding service:", err);
      return null;
    }
  }, [updateEscortProfile]);
  
  /**
   * Removes a service from the escort's profile
   */
  const removeService = useCallback(async (id: string, service: ServiceType, escort?: Escort | null) => {
    if (!id) {
      toast({
        title: "Error removing service",
        description: "Profile ID is required",
        variant: "destructive",
      });
      return null;
    }
    
    if (!escort) {
      toast({
        title: "Error removing service",
        description: "Escort profile is required",
        variant: "destructive",
      });
      return null;
    }
    
    const updatedServices = (escort.services || []).filter(s => s !== service);
    
    try {
      return await updateEscortProfile(id, { services: updatedServices });
    } catch (err) {
      console.error("Error removing service:", err);
      return null;
    }
  }, [updateEscortProfile]);

  /**
   * Updates the rates for the escort
   */
  const updateRates = useCallback(async (id: string, rates: Escort['rates']) => {
    if (!id) {
      toast({
        title: "Error updating rates",
        description: "Profile ID is required",
        variant: "destructive",
      });
      return null;
    }

    try {
      return await updateEscortProfile(id, { rates });
    } catch (err) {
      console.error("Error updating rates:", err);
      return null;
    }
  }, [updateEscortProfile]);

  /**
   * Updates the availability for the escort
   */
  const updateAvailability = useCallback(async (id: string, availability: Escort['availability']) => {
    if (!id) {
      toast({
        title: "Error updating availability",
        description: "Profile ID is required",
        variant: "destructive",
      });
      return null;
    }

    try {
      return await updateEscortProfile(id, { availability });
    } catch (err) {
      console.error("Error updating availability:", err);
      return null;
    }
  }, [updateEscortProfile]);

  return {
    addService,
    removeService,
    updateRates,
    updateAvailability
  };
};
