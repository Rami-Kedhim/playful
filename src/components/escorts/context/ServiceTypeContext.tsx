
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

export const useServiceTypeContext = () => useContext(ServiceTypeContext);
