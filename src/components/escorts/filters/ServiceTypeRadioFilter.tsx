
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Users, Video, Check } from "lucide-react";

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
      className="space-y-3"
    >
      <div className="grid grid-cols-1 gap-3">
        <Label
          htmlFor="service-type-in-person"
          className={`flex items-center gap-3 rounded-lg border border-muted p-3 cursor-pointer hover:bg-accent transition-colors
            ${serviceTypeFilter === "in-person" ? "bg-accent border-primary" : ""}`}
        >
          <RadioGroupItem id="service-type-in-person" value="in-person" className="sr-only" />
          <Users className="h-4 w-4" />
          <div className="flex-1">
            <div className="font-medium">In-Person Services</div>
            <div className="text-xs text-muted-foreground">Meet escorts in real life</div>
          </div>
          {serviceTypeFilter === "in-person" && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </Label>
        
        <Label
          htmlFor="service-type-virtual"
          className={`flex items-center gap-3 rounded-lg border border-muted p-3 cursor-pointer hover:bg-accent transition-colors
            ${serviceTypeFilter === "virtual" ? "bg-accent border-primary" : ""}`}
        >
          <RadioGroupItem id="service-type-virtual" value="virtual" className="sr-only" />
          <Video className="h-4 w-4" />
          <div className="flex-1">
            <div className="font-medium">Virtual Services</div>
            <div className="text-xs text-muted-foreground">Online content and cam shows</div>
          </div>
          {serviceTypeFilter === "virtual" && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </Label>
        
        <Label
          htmlFor="service-type-both"
          className={`flex items-center gap-3 rounded-lg border border-muted p-3 cursor-pointer hover:bg-accent transition-colors
            ${serviceTypeFilter === "both" ? "bg-accent border-primary" : ""}`}
        >
          <RadioGroupItem id="service-type-both" value="both" className="sr-only" />
          <div className="flex h-4 w-4 items-center justify-center space-x-0.5">
            <Users className="h-3 w-3" />
            <Video className="h-3 w-3" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Both Service Types</div>
            <div className="text-xs text-muted-foreground">In-person and virtual options</div>
          </div>
          {serviceTypeFilter === "both" && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </Label>
        
        <Label
          htmlFor="service-type-none"
          className={`flex items-center gap-3 rounded-lg border border-muted p-3 cursor-pointer hover:bg-accent transition-colors
            ${serviceTypeFilter === "" ? "bg-accent border-primary" : ""}`}
        >
          <RadioGroupItem id="service-type-none" value="" className="sr-only" />
          <div className="h-4 w-4 flex items-center justify-center">•</div>
          <div className="flex-1">
            <div className="font-medium">No Preference</div>
            <div className="text-xs text-muted-foreground">Show all service types</div>
          </div>
          {serviceTypeFilter === "" && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </Label>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeRadioFilter;
