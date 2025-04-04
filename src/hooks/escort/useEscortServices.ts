
import { Escort, ServiceType } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for managing escort services
 */
export const useEscortServices = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  /**
   * Add a service to an escort profile
   */
  const addService = async (id: string, service: ServiceType, escort: Escort | null) => {
    if (!escort) {
      toast({
        title: "Error adding service",
        description: "Profile not found",
        variant: "destructive",
      });
      return null;
    }
    
    const services = escort.services || [];
    
    // Check if service already exists
    if (services.includes(service)) {
      toast({
        title: "Service exists",
        description: `${service} is already in your services list`,
      });
      return escort;
    }
    
    try {
      const updatedEscort = await updateEscortProfile(id, {
        services: [...services, service]
      });
      
      if (updatedEscort) {
        toast({
          title: "Service added",
          description: `${service} has been added to your services`,
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error adding service:", error);
      return null;
    }
  };

  /**
   * Remove a service from an escort profile
   */
  const removeService = async (id: string, service: ServiceType, escort: Escort | null) => {
    if (!escort) {
      toast({
        title: "Error removing service",
        description: "Profile not found",
        variant: "destructive",
      });
      return null;
    }
    
    const services = escort.services || [];
    
    if (!services.includes(service)) {
      toast({
        title: "Service not found",
        description: `${service} is not in your services list`,
      });
      return escort;
    }
    
    try {
      const updatedEscort = await updateEscortProfile(id, {
        services: services.filter(s => s !== service)
      });
      
      if (updatedEscort) {
        toast({
          title: "Service removed",
          description: `${service} has been removed from your services`,
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error removing service:", error);
      return null;
    }
  };

  /**
   * Update rates for an escort profile
   */
  const updateRates = async (id: string, rates: Escort['rates']) => {
    try {
      const updatedEscort = await updateEscortProfile(id, { rates });
      
      if (updatedEscort) {
        toast({
          title: "Rates updated",
          description: "Your rates have been updated successfully",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error updating rates:", error);
      toast({
        title: "Error updating rates",
        description: "Failed to update rates",
        variant: "destructive",
      });
      return null;
    }
  };

  /**
   * Update availability for an escort profile
   */
  const updateAvailability = async (id: string, availability: Escort['availability']) => {
    try {
      const updatedEscort = await updateEscortProfile(id, { availability });
      
      if (updatedEscort) {
        toast({
          title: "Availability updated",
          description: "Your availability has been updated successfully",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error updating availability:", error);
      toast({
        title: "Error updating availability",
        description: "Failed to update availability",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    addService,
    removeService,
    updateRates,
    updateAvailability
  };
};
