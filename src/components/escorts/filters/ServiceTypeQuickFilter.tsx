
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import ServiceTypeRadioGroup from './ServiceTypeRadioGroup';

interface ServiceTypeQuickFilterProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  className?: string;
  showLabel?: boolean;
}

/**
 * Compact service type filter for use in headers and quick filter bars
 */
const ServiceTypeQuickFilter: React.FC<ServiceTypeQuickFilterProps> = ({
  serviceTypeFilter,
  setServiceTypeFilter,
  className,
  showLabel = true
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-3">
        {showLabel && (
          <Label className="mb-2 block text-xs">Filter by service type</Label>
        )}
        <ServiceTypeRadioGroup
          serviceTypeFilter={serviceTypeFilter}
          setServiceTypeFilter={setServiceTypeFilter}
          size="sm"
          layout="horizontal"
          showLabels={false}
        />
      </CardContent>
    </Card>
  );
};

export default ServiceTypeQuickFilter;
