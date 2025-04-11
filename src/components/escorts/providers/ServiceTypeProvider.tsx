
import React, { ReactNode } from 'react';
import { ServiceTypeProvider as ServiceTypeContextProvider } from '../context/ServiceTypeContext';

interface ServiceTypeProviderProps {
  children: ReactNode;
}

/**
 * Provider wrapper for service type context
 */
const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({ children }) => {
  return <ServiceTypeContextProvider>{children}</ServiceTypeContextProvider>;
};

export default ServiceTypeProvider;
