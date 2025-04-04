
import { useMemo } from "react";
import { 
  serviceCategories, 
  getServiceById, 
  mapLegacyServiceToId 
} from "@/data/serviceCategories";
import { 
  groupServicesByCategory, 
  getServiceCategoryNames 
} from "@/utils/serviceUtils";

/**
 * Custom hook for working with escort services
 */
export const useServices = (services: string[] = []) => {
  // Group services by their categories
  const servicesByCategory = useMemo(() => 
    groupServicesByCategory(services), 
    [services]
  );

  // Get categories that have services
  const categoriesWithServices = useMemo(() => 
    serviceCategories.filter(
      category => servicesByCategory[category.id]?.length > 0
    ),
    [servicesByCategory]
  );

  // Get all category names that have services
  const categoryNames = useMemo(() => 
    getServiceCategoryNames(services),
    [services]
  );

  // Get details about a specific service
  const getServiceDetails = (serviceName: string) => {
    const serviceId = mapLegacyServiceToId(serviceName);
    
    // Find which category this service belongs to
    for (const category of serviceCategories) {
      const service = category.services.find(s => s.id === serviceId);
      if (service) {
        return {
          category: category.name,
          serviceName: service.name,
          description: service.description
        };
      }
    }
    
    // Default if not found
    return {
      category: "Specialty",
      serviceName,
      description: "Customized professional service"
    };
  };

  return {
    servicesByCategory,
    categoriesWithServices,
    categoryNames,
    getServiceDetails,
    hasServices: services.length > 0
  };
};

export default useServices;
