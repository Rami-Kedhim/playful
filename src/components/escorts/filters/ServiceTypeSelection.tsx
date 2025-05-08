
import React from 'react';
import { useServiceType } from '@/contexts/ServiceTypeContext';
import { Button } from '@/components/ui/button';
import { ServiceTypeBadge } from '@/components/ui/service-badge';
import { ServiceTypeFilter } from '@/types/serviceType';

interface ServiceTypeSelectionProps {
  selectedType: ServiceTypeFilter | null;
  onSelectType: (type: ServiceTypeFilter) => void;
}

const ServiceTypeSelection: React.FC<ServiceTypeSelectionProps> = ({ 
  selectedType,
  onSelectType
}) => {
  const { serviceTypes } = useServiceType();

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {serviceTypes.map((type) => (
        <Button
          key={type}
          onClick={() => onSelectType(type as ServiceTypeFilter)}
          variant={selectedType === type ? "default" : "outline"}
          size="sm"
          className="rounded-full"
        >
          <ServiceTypeBadge
            type={type as ServiceTypeFilter}
            className={selectedType === type ? "bg-white/20" : ""}
          />
        </Button>
      ))}
    </div>
  );
};

export default ServiceTypeSelection;
