
import { mapLegacyServiceToId, serviceCategories } from "@/data/serviceCategories";

/**
 * Groups services by their categories
 * @param services Array of service names
 * @returns Object with category IDs as keys and arrays of service IDs as values
 */
export const groupServicesByCategory = (services: string[]) => {
  const result: Record<string, string[]> = {};
  
  // Initialize categories
  serviceCategories.forEach(category => {
    result[category.id] = [];
  });
  
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
  escortServices: string[], 
  selectedCategories: string[]
): boolean => {
  if (!selectedCategories.length) return true; // No filter active
  if (!escortServices.length) return false; // No services to match
  
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
export const getServiceCategoryNames = (services: string[]): string[] => {
  const servicesByCategory = groupServicesByCategory(services);
  
  // Get category names for non-empty categories
  return serviceCategories
    .filter(category => servicesByCategory[category.id]?.length > 0)
    .map(category => category.name);
};
