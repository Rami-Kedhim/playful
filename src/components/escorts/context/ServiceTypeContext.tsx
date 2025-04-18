
import { createContext, useContext } from 'react';
import { ServiceTypeFilter } from '@/types/filters';

// Use "export type" for re-export when isolatedModules is enabled
export type { ServiceTypeFilter };

export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  availableServiceTypes: ServiceTypeFilter[];
}

export const ServiceTypeContext = createContext<ServiceTypeContextType>({
  serviceType: '',
  setServiceType: () => {},
  availableServiceTypes: ['in-person', 'virtual', 'both']
});

// Export the hook to use the context
export const useServiceTypeContext = () => useContext(ServiceTypeContext);
// Add backward compatibility alias
export const useServiceType = useServiceTypeContext;

// Add ServiceTypeProvider component for compatibility
export const ServiceTypeProvider = ({ children }: { children: React.ReactNode }) => {
  // This is a placeholder - the actual implementation should be in its own file
  return <>{children}</>;
};
