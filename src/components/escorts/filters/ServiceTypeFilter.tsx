
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ServiceTypeFilterProps {
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

// Small utility function to get a display-friendly name for each service type
export const getServiceTypeName = (type: "in-person" | "virtual" | "both" | ""): string => {
  switch (type) {
    case "in-person":
      return "In-person Services";
    case "virtual":
      return "Virtual Content";
    case "both":
      return "Both Services";
    default:
      return "All Services";
  }
};

const ServiceTypeFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}: ServiceTypeFilterProps) => {
  return (
    <RadioGroup
      value={serviceTypeFilter || ""}
      onValueChange={(value) => 
        setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")
      }
      className="gap-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="" id="service-all" />
        <Label htmlFor="service-all" className="cursor-pointer">All Services</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="in-person" id="service-in-person" />
        <Label htmlFor="service-in-person" className="cursor-pointer">In-person Services</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="virtual" id="service-virtual" />
        <Label htmlFor="service-virtual" className="cursor-pointer">Virtual Content</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="both" id="service-both" />
        <Label htmlFor="service-both" className="cursor-pointer">Both Services</Label>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeFilter;
