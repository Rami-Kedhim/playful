
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { ServiceTypeFilter, getServiceTypeInfo } from "./ServiceTypeBadgeLabel";
import ServiceTypeIcon from "./ServiceTypeIcon";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceTypeRadioFilterProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  variant?: "default" | "compact";
}

const ServiceTypeRadioFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter,
  variant = "default"
}: ServiceTypeRadioFilterProps) => {
  const isCompact = variant === "compact";
  
  return (
    <RadioGroup 
      value={serviceTypeFilter} 
      onValueChange={(value) => 
        setServiceTypeFilter(value as ServiceTypeFilter)
      }
      className={cn("space-y-3", isCompact && "flex space-y-0 space-x-2")}
    >
      <div className={cn(
        "grid gap-3",
        isCompact ? "grid-cols-4" : "grid-cols-1"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor="service-type-in-person"
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                  "hover:bg-accent hover:border-accent",
                  serviceTypeFilter === "in-person" 
                    ? "bg-accent border-primary ring-1 ring-primary" 
                    : "border-muted",
                  isCompact && "flex-col p-2 text-center"
                )}
              >
                <RadioGroupItem id="service-type-in-person" value="in-person" className="sr-only" />
                <ServiceTypeIcon 
                  type="in-person" 
                  size={isCompact ? 24 : 16} 
                />
                <div className={cn("flex-1", isCompact && "text-center")}>
                  <div className="font-medium">{getServiceTypeInfo("in-person").filterLabel}</div>
                  {!isCompact && (
                    <div className="text-xs text-muted-foreground">{getServiceTypeInfo("in-person").description}</div>
                  )}
                </div>
                {serviceTypeFilter === "in-person" && !isCompact && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </Label>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {getServiceTypeInfo("in-person").description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor="service-type-virtual"
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                  "hover:bg-accent hover:border-accent",
                  serviceTypeFilter === "virtual" 
                    ? "bg-accent border-primary ring-1 ring-primary" 
                    : "border-muted",
                  isCompact && "flex-col p-2 text-center"
                )}
              >
                <RadioGroupItem id="service-type-virtual" value="virtual" className="sr-only" />
                <ServiceTypeIcon 
                  type="virtual" 
                  size={isCompact ? 24 : 16} 
                />
                <div className={cn("flex-1", isCompact && "text-center")}>
                  <div className="font-medium">{getServiceTypeInfo("virtual").filterLabel}</div>
                  {!isCompact && (
                    <div className="text-xs text-muted-foreground">{getServiceTypeInfo("virtual").description}</div>
                  )}
                </div>
                {serviceTypeFilter === "virtual" && !isCompact && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </Label>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {getServiceTypeInfo("virtual").description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor="service-type-both"
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                  "hover:bg-accent hover:border-accent",
                  serviceTypeFilter === "both" 
                    ? "bg-accent border-primary ring-1 ring-primary" 
                    : "border-muted",
                  isCompact && "flex-col p-2 text-center"
                )}
              >
                <RadioGroupItem id="service-type-both" value="both" className="sr-only" />
                <ServiceTypeIcon 
                  type="both" 
                  size={isCompact ? 24 : 16} 
                />
                <div className={cn("flex-1", isCompact && "text-center")}>
                  <div className="font-medium">{getServiceTypeInfo("both").filterLabel}</div>
                  {!isCompact && (
                    <div className="text-xs text-muted-foreground">{getServiceTypeInfo("both").description}</div>
                  )}
                </div>
                {serviceTypeFilter === "both" && !isCompact && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </Label>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {getServiceTypeInfo("both").description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                htmlFor="service-type-none"
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                  "hover:bg-accent hover:border-accent",
                  serviceTypeFilter === "" 
                    ? "bg-accent border-primary ring-1 ring-primary" 
                    : "border-muted",
                  isCompact && "flex-col p-2 text-center"
                )}
              >
                <RadioGroupItem id="service-type-none" value="" className="sr-only" />
                <div className={cn(
                  "h-4 w-4 flex items-center justify-center text-muted-foreground",
                  isCompact && "h-6 w-6"
                )}>•</div>
                <div className={cn("flex-1", isCompact && "text-center")}>
                  <div className="font-medium">{getServiceTypeInfo("").filterLabel}</div>
                  {!isCompact && (
                    <div className="text-xs text-muted-foreground">{getServiceTypeInfo("").description}</div>
                  )}
                </div>
                {serviceTypeFilter === "" && !isCompact && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </Label>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {getServiceTypeInfo("").description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeRadioFilter;
