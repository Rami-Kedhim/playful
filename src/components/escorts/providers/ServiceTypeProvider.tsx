
import React, { ReactNode } from 'react';
import { ServiceTypeProvider as ServiceTypeContextProvider } from '../context/ServiceTypeContext';
import { ServiceType } from '../filters/ServiceTypeFilterRules';
import { useToast } from '@/hooks/use-toast';

interface ServiceTypeProviderProps {
  children: ReactNode;
  supportedServiceTypes?: ServiceType[];
  filterForbiddenTerms?: boolean;
  showWarningsOnRemap?: boolean;
}

/**
 * Provider wrapper for service type context
 * Can be configured to support specific service types and filter forbidden terms
 */
const ServiceTypeProvider: React.FC<ServiceTypeProviderProps> = ({ 
  children,
  supportedServiceTypes,
  filterForbiddenTerms = true,
  showWarningsOnRemap = true
}) => {
  const { toast } = useToast();
  
  // Callback to show warnings when unsafe terms are remapped
  const handleUnsafeTermRemap = React.useCallback((original: string, remapped: ServiceType) => {
    if (showWarningsOnRemap) {
      toast({
        title: "Content Notice",
        description: `The term '${original}' has been remapped to '${remapped}' according to platform guidelines.`,
        variant: "default",
      });
    }
  }, [showWarningsOnRemap, toast]);
  
  return (
    <ServiceTypeContextProvider
      supportedServiceTypes={supportedServiceTypes}
      filterForbiddenTerms={filterForbiddenTerms}
      onUnsafeTermRemap={handleUnsafeTermRemap}
    >
      {children}
    </ServiceTypeContextProvider>
  );
};

export default ServiceTypeProvider;
