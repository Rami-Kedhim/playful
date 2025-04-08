
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ServiceTypeRadioFilterProps {
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

const ServiceTypeRadioFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}: ServiceTypeRadioFilterProps) => {
  return (
    <RadioGroup 
      value={serviceTypeFilter} 
      onValueChange={(value) => 
        setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")
      }
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            id="service-type-in-person" 
            value="in-person" 
          />
          <Label htmlFor="service-type-in-person">In-Person Services</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            id="service-type-virtual" 
            value="virtual"
          />
          <Label htmlFor="service-type-virtual">Virtual Services</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            id="service-type-both" 
            value="both"
          />
          <Label htmlFor="service-type-both">Both Services Types</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            id="service-type-none" 
            value=""
          />
          <Label htmlFor="service-type-none">No Preference</Label>
        </div>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeRadioFilter;
