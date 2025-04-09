
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ServiceTypeFilterProps {
  serviceTypeFilter: "" | "in-person" | "virtual" | "both";
  setServiceTypeFilter: (value: "" | "in-person" | "virtual" | "both") => void;
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
        onValueChange={(value) => setServiceTypeFilter(value as "" | "in-person" | "virtual" | "both")}
        className="grid grid-cols-1 gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="" id="service-all" />
          <Label htmlFor="service-all" className="cursor-pointer">All Services</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="in-person" id="service-in-person" />
          <Label htmlFor="service-in-person" className="cursor-pointer">In-Person Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="virtual" id="service-virtual" />
          <Label htmlFor="service-virtual" className="cursor-pointer">Virtual Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="service-both" />
          <Label htmlFor="service-both" className="cursor-pointer">Both In-Person & Virtual</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ServiceTypeFilter;
