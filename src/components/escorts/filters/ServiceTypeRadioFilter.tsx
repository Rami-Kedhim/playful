
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Users, Video, Check } from "lucide-react";
import { ServiceTypeFilter, getServiceTypeInfo } from "./ServiceTypeBadgeLabel";
import { cn } from "@/lib/utils";

interface ServiceTypeRadioFilterProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
}

const ServiceTypeRadioFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}: ServiceTypeRadioFilterProps) => {
  return (
    <RadioGroup 
      value={serviceTypeFilter} 
      onValueChange={(value) => 
        setServiceTypeFilter(value as ServiceTypeFilter)
      }
      className="space-y-3"
    >
      <div className="grid grid-cols-1 gap-3">
        <Label
          htmlFor="service-type-in-person"
          className={cn(
            "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
            "hover:bg-accent hover:border-accent",
            serviceTypeFilter === "in-person" 
              ? "bg-accent border-primary ring-1 ring-primary" 
              : "border-muted"
          )}
        >
          <RadioGroupItem id="service-type-in-person" value="in-person" className="sr-only" />
          <Users className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <div className="font-medium">{getServiceTypeInfo("in-person").name}</div>
            <div className="text-xs text-muted-foreground">{getServiceTypeInfo("in-person").description}</div>
          </div>
          {serviceTypeFilter === "in-person" && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </Label>
        
        <Label
          htmlFor="service-type-virtual"
          className={cn(
            "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
            "hover:bg-accent hover:border-accent",
            serviceTypeFilter === "virtual" 
              ? "bg-accent border-primary ring-1 ring-primary" 
              : "border-muted"
          )}
        >
          <RadioGroupItem id="service-type-virtual" value="virtual" className="sr-only" />
          <Video className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <div className="font-medium">{getServiceTypeInfo("virtual").name}</div>
            <div className="text-xs text-muted-foreground">{getServiceTypeInfo("virtual").description}</div>
          </div>
          {serviceTypeFilter === "virtual" && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </Label>
        
        <Label
          htmlFor="service-type-both"
          className={cn(
            "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
            "hover:bg-accent hover:border-accent",
            serviceTypeFilter === "both" 
              ? "bg-accent border-primary ring-1 ring-primary" 
              : "border-muted"
          )}
        >
          <RadioGroupItem id="service-type-both" value="both" className="sr-only" />
          <div className="flex h-4 w-4 items-center justify-center space-x-0.5 text-primary">
            <Users className="h-3 w-3" />
            <Video className="h-3 w-3 ml-0.5" />
          </div>
          <div className="flex-1">
            <div className="font-medium">{getServiceTypeInfo("both").name}</div>
            <div className="text-xs text-muted-foreground">{getServiceTypeInfo("both").description}</div>
          </div>
          {serviceTypeFilter === "both" && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </Label>
        
        <Label
          htmlFor="service-type-none"
          className={cn(
            "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
            "hover:bg-accent hover:border-accent",
            serviceTypeFilter === "" 
              ? "bg-accent border-primary ring-1 ring-primary" 
              : "border-muted"
          )}
        >
          <RadioGroupItem id="service-type-none" value="" className="sr-only" />
          <div className="h-4 w-4 flex items-center justify-center text-primary">•</div>
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
