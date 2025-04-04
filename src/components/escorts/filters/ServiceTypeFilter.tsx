
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ServiceTypeFilterProps {
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

const ServiceTypeFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}: ServiceTypeFilterProps) => {
  return (
    <RadioGroup 
      value={serviceTypeFilter} 
      onValueChange={(value) => setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")}
      className="space-y-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="" id="service-type-all" />
        <Label htmlFor="service-type-all">All Service Types</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="in-person" id="service-type-in-person" />
        <Label htmlFor="service-type-in-person">In-Person</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="virtual" id="service-type-virtual" />
        <Label htmlFor="service-type-virtual">Virtual Only</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="both" id="service-type-both" />
        <Label htmlFor="service-type-both">In-Person & Virtual</Label>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeFilter;
