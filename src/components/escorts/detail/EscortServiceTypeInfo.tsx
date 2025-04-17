
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Escort } from '@/types/escort';

type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface EscortServiceTypeInfoProps {
  escort: Escort;
}

const EscortServiceTypeInfo: React.FC<EscortServiceTypeInfoProps> = ({ escort }) => {
  // Get service type from escort
  const getServiceType = (): ServiceTypeFilter => {
    if (escort.services && escort.services.includes('in-person') && escort.services.includes('virtual')) {
      return 'both';
    } else if (escort.services && escort.services.includes('in-person')) {
      return 'in-person';
    } else if (escort.services && escort.services.includes('virtual')) {
      return 'virtual';
    }
    return '';
  };

  const serviceType = getServiceType();
  
  if (!serviceType) return null;
  
  return (
    <Badge 
      variant="outline"
      className={`
        ${serviceType === 'in-person' && 'bg-indigo-100 text-indigo-800 border-indigo-200'}
        ${serviceType === 'virtual' && 'bg-purple-100 text-purple-800 border-purple-200'}
        ${serviceType === 'both' && 'bg-blue-100 text-blue-800 border-blue-200'}
      `}
    >
      {serviceType === 'in-person' && 'In-Person Services'}
      {serviceType === 'virtual' && 'Virtual Services'}
      {serviceType === 'both' && 'In-Person & Virtual'}
    </Badge>
  );
};

export default EscortServiceTypeInfo;
