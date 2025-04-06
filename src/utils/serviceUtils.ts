
import { mapLegacyServiceToId, serviceCategories, getCategoryById, getServiceById } from "@/data/serviceCategories";

/**
 * Groups services by their categories
 * @param services Array of service names
 * @returns Object with category IDs as keys and arrays of service IDs as values
 */
export const groupServicesByCategory = (services: string[] = []) => {
  const result: Record<string, string[]> = {};
  
  // Initialize categories
  serviceCategories.forEach(category => {
    result[category.id] = [];
  });
  
  // Handle undefined services or empty array
  if (!services || services.length === 0) {
    return result;
  }
  
  // Map services to categories
  services.forEach(service => {
    const serviceId = mapLegacyServiceToId(service);
    
    // Find which category this service belongs to
    for (const category of serviceCategories) {
      if (category.services.some(s => s.id === serviceId)) {
        result[category.id].push(serviceId);
        return;
      }
    }
    
    // If no category found, add to "specialty"
    result["specialty"].push(serviceId);
  });
  
  return result;
};

/**
 * Determines if an escort's services match the selected service filters
 * @param escortServices Array of escort's service names
 * @param selectedCategories Array of selected category IDs
 * @returns Boolean indicating if the escort's services match the filter
 */
export const matchesServiceFilters = (
  escortServices: string[] = [], 
  selectedCategories: string[]
): boolean => {
  if (!selectedCategories.length) return true; // No filter active
  if (!escortServices || !escortServices.length) return false; // No services to match
  
  const servicesByCategory = groupServicesByCategory(escortServices);
  
  // Check if any of the selected categories have services
  return selectedCategories.some(categoryId => 
    servicesByCategory[categoryId]?.length > 0
  );
};

/**
 * Returns a human-readable list of service categories
 * @param services Array of service names
 * @returns Array of unique category names
 */
export const getServiceCategoryNames = (services: string[] = []): string[] => {
  const servicesByCategory = groupServicesByCategory(services);
  
  // Get category names for non-empty categories
  return serviceCategories
    .filter(category => servicesByCategory[category.id]?.length > 0)
    .map(category => category.name);
};

/**
 * Gets service details by its ID
 * @param serviceId The ID of the service
 * @returns An object with service details and category information
 */
export const getServiceDetails = (serviceId: string) => {
  for (const category of serviceCategories) {
    const service = category.services.find(s => s.id === serviceId);
    if (service) {
      return {
        service,
        category
      };
    }
  }
  
  return null;
};

/**
 * Groups services by their primary attributes (relaxation, entertainment, etc.)
 * Useful for creating tag clouds or feature highlights
 */
export const groupServicesByAttribute = (services: string[]) => {
  const attributes: Record<string, number> = {
    "relaxation": 0,
    "entertainment": 0,
    "companionship": 0,
    "social": 0,
    "specialty": 0
  };
  
  // Map services to general attributes
  services.forEach(service => {
    const serviceId = mapLegacyServiceToId(service);
    const details = getServiceDetails(serviceId);
    
    if (details) {
      if (details.category.id === "wellness") {
        attributes["relaxation"]++;
      } else if (details.category.id === "entertainment") {
        attributes["entertainment"]++;
      } else if (details.category.id === "companionship") {
        attributes["companionship"]++;
      } else if (details.category.id === "virtual") {
        attributes["social"]++;
      } else {
        attributes["specialty"]++;
      }
    } else {
      attributes["specialty"]++;
    }
  });
  
  return attributes;
};
