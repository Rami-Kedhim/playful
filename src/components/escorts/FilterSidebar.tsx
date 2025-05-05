
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ServiceTypeFilter } from './filters/ServiceTypeBadgeLabel';
import ServiceTypeIcon from './filters/ServiceTypeIcon';

interface FilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedServiceType: ServiceTypeFilter;
  onServiceTypeChange: (type: ServiceTypeFilter) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open,
  onOpenChange,
  selectedServiceType,
  onServiceTypeChange,
  onApplyFilters,
  onResetFilters
}) => {
  const [localSelectedServiceType, setLocalSelectedServiceType] = useState<ServiceTypeFilter>(selectedServiceType);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onServiceTypeChange(localSelectedServiceType);
    onApplyFilters();
    onOpenChange(false);
  };
  
  const handleReset = () => {
    setLocalSelectedServiceType("any");
    onResetFilters();
  };
  
  // Helper function to determine if a radio is checked
  const isChecked = (value: ServiceTypeFilter) => {
    return localSelectedServiceType === value;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Escorts</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Service Type</h3>
              <RadioGroup 
                defaultValue={selectedServiceType}
                value={localSelectedServiceType}
                onValueChange={(value) => setLocalSelectedServiceType(value as ServiceTypeFilter)}
                className="grid grid-cols-2 gap-4 pt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any" className="flex items-center gap-2 cursor-pointer">
                    <ServiceTypeIcon type="any" />
                    <span>Any Type</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person" className="flex items-center gap-2 cursor-pointer">
                    <ServiceTypeIcon type="in-person" />
                    <span>In Person</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="virtual" id="virtual" />
                  <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
                    <ServiceTypeIcon type="virtual" />
                    <span>Virtual</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" className="flex items-center gap-2 cursor-pointer">
                    <ServiceTypeIcon type="both" />
                    <span>Both Types</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="massage" id="massage" />
                  <Label htmlFor="massage" className="flex items-center gap-2 cursor-pointer">
                    <ServiceTypeIcon type="massage" />
                    <span>Massage</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dinner" id="dinner" />
                  <Label htmlFor="dinner" className="flex items-center gap-2 cursor-pointer">
                    <ServiceTypeIcon type="dinner" />
                    <span>Dinner Date</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="pt-6 space-x-2 flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="w-1/2"
              >
                Reset Filters
              </Button>
              <Button 
                type="submit"
                className="w-1/2"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
