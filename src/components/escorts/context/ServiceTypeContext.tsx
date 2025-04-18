
import { createContext, useContext } from 'react';

// Define the type for service type filter
export type ServiceTypeFilter = '' | 'in-person' | 'virtual' | 'both' | 'massage' | 'dinner';

// Define types for specialized service types
export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  availableServiceTypes: ServiceTypeFilter[];
  // Additional properties for specialized service types
  specializedServiceTypes: string[];
  selectedSpecializedTypes: string[];
  toggleSpecializedType: (type: string) => void;
}

// Create context with default values
export const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: '',
  setServiceType: () => {},
  availableServiceTypes: ['in-person', 'virtual', 'both', 'massage', 'dinner'],
  specializedServiceTypes: [],
  selectedSpecializedTypes: [],
  toggleSpecializedType: () => {}
});

// Export the hook to use the context
export const useServiceTypeContext = () => useContext(ServiceTypeContext);
// Add backward compatibility alias
export const useServiceType = useServiceTypeContext;

// Add ServiceTypeProvider component for compatibility
export const ServiceTypeProvider = ({ 
  children, 
  supportedServiceTypes,
  filterForbiddenTerms,
  onUnsafeTermRemap
}: { 
  children: React.ReactNode;
  supportedServiceTypes?: string[];
  filterForbiddenTerms?: boolean;
  onUnsafeTermRemap?: (original: string, remapped: string) => void;
}) => {
  // This is a placeholder - the actual implementation should be in its own file
  return <>{children}</>;
};
