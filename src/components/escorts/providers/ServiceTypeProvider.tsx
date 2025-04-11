
import React, { ReactNode } from 'react';
import { ServiceTypeProvider as ServiceTypeContextProvider } from '../context/ServiceTypeContext';
import { ServiceType } from '../filters/ServiceTypeFilterRules';

interface ServiceTypeProviderProps {
  children: ReactNode;
  supportedServiceTypes?: ServiceType[];
  filterForbiddenTerms?: boolean;
}

/**
 * Provider wrapper for service type context
 * Can be configured to support specific service types and filter forbidden terms
 */
const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({ 
  children,
  supportedServiceTypes,
  filterForbiddenTerms = true
}) => {
  return (
    <ServiceTypeContextProvider
      supportedServiceTypes={supportedServiceTypes}
      filterForbiddenTerms={filterForbiddenTerms}
    >
      {children}
    </ServiceTypeContextProvider>
  );
};

export default ServiceTypeProvider;
