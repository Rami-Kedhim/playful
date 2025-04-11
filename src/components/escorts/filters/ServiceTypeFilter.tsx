
import React from 'react';
import { Label } from '@/components/ui/label';
import { ServiceTypeFilter as ServiceTypeFilterType } from './ServiceTypeBadgeLabel';
import ServiceTypeRadioGroup from './ServiceTypeRadioGroup';

interface ServiceTypeFilterProps {
  serviceTypeFilter: ServiceTypeFilterType;
  setServiceTypeFilter: (type: ServiceTypeFilterType) => void;
  layout?: 'horizontal' | 'vertical';
}

const ServiceTypeFilter: React.FC<ServiceTypeFilterProps> = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter,
  layout = 'vertical'
}) => {
  return (
    <div className="space-y-2">
      <Label>Service Type</Label>
      <ServiceTypeRadioGroup
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        layout={layout}
        showLabels={true}
      />
    </div>
  );
};

export default ServiceTypeFilter;
