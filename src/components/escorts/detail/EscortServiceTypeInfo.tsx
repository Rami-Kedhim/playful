import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Escort } from '@/types/escort';
import { ServiceTypeFilter } from '@/types/escort';

interface EscortServiceTypeInfoProps {
  escort: Escort;
  serviceTypeFilter: ServiceTypeFilter;
}

const EscortServiceTypeInfo: React.FC<EscortServiceTypeInfoProps> = ({ escort, serviceTypeFilter }) => {
  const renderServiceTypes = () => {
    if (!escort.serviceTypes || escort.serviceTypes.length === 0) {
      return <Badge variant="secondary">No Services Listed</Badge>;
    }

    return escort.serviceTypes.map((service, index) => (
      <Badge key={index} variant="secondary">{service}</Badge>
    ));
  };

  const renderServiceTypeFilter = () => {
    switch (serviceTypeFilter) {
      case 'in-person':
        return <Badge variant="outline">In-Person Services</Badge>;
      case 'virtual':
        return <Badge variant="outline">Virtual Services</Badge>;
      case 'both':
        return <Badge variant="outline">Both In-Person & Virtual</Badge>;
      default:
        return <Badge variant="outline">All Services</Badge>;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {renderServiceTypes()}
      {renderServiceTypeFilter()}
    </div>
  );
};

export default EscortServiceTypeInfo;
