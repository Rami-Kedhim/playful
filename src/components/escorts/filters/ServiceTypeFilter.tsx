
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Monitor, Users, Globe } from 'lucide-react';
import { ServiceTypeFilter as ServiceTypeFilterValue } from './ServiceTypeBadgeLabel';

interface ServiceTypeFilterProps {
  serviceTypeFilter: ServiceTypeFilterValue;
  setServiceTypeFilter: (type: ServiceTypeFilterValue) => void;
}

const ServiceTypeFilter = ({
  serviceTypeFilter,
  setServiceTypeFilter
}: ServiceTypeFilterProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Service Type</Label>
      <RadioGroup
        value={serviceTypeFilter}
        onValueChange={(value) => setServiceTypeFilter(value as ServiceTypeFilterValue)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="" id="all-types" />
          <Label htmlFor="all-types" className="text-sm font-normal flex items-center">
            All Types
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="in-person" id="in-person" />
          <Label htmlFor="in-person" className="text-sm font-normal flex items-center">
            <Users size={14} className="mr-1" /> In-Person
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="virtual" id="virtual" />
          <Label htmlFor="virtual" className="text-sm font-normal flex items-center">
            <Monitor size={14} className="mr-1" /> Virtual
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="both" />
          <Label htmlFor="both" className="text-sm font-normal flex items-center">
            <Globe size={14} className="mr-1" /> Both Services
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ServiceTypeFilter;
