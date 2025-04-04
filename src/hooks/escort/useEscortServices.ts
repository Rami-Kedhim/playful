
import { Escort, ServiceType } from "@/types/escort";

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
    if (!escort) return null;
    
    const services = escort.services || [];
    
    // Check if service already exists
    if (services.includes(service)) {
      return escort;
    }
    
    return updateEscortProfile(id, {
      services: [...services, service]
    });
  };

  /**
   * Remove a service from an escort profile
   */
  const removeService = async (id: string, service: ServiceType, escort: Escort | null) => {
    if (!escort) return null;
    
    const services = escort.services || [];
    
    return updateEscortProfile(id, {
      services: services.filter(s => s !== service)
    });
  };

  /**
   * Update rates for an escort profile
   */
  const updateRates = async (id: string, rates: Escort['rates']) => {
    return updateEscortProfile(id, { rates });
  };

  /**
   * Update availability for an escort profile
   */
  const updateAvailability = async (id: string, availability: Escort['availability']) => {
    return updateEscortProfile(id, { availability });
  };

  return {
    addService,
    removeService,
    updateRates,
    updateAvailability
  };
};
