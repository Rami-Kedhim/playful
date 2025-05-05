
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  isOpen,
  onClose,
  onApplyFilters,
  onResetFilters
}) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-background shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Filter sections */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Location</h3>
            <input 
              type="text"
              className="w-full p-2 border rounded-md" 
              placeholder="Enter location"
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Price Range</h3>
            {/* Price range slider would go here */}
            <div className="flex items-center justify-between">
              <input type="number" className="w-24 p-2 border rounded-md" placeholder="Min" />
              <span className="mx-2">to</span>
              <input type="number" className="w-24 p-2 border rounded-md" placeholder="Max" />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="verified-filter">Verified Only</Label>
              <Switch id="verified-filter" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="available-filter">Available Now</Label>
              <Switch id="available-filter" />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Services</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Massage', 'Escort', 'Companionship', 'Virtual', 'Other'].map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <input type="checkbox" id={`service-${service}`} className="rounded" />
                  <label htmlFor={`service-${service}`} className="text-sm">{service}</label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Gender</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Female', 'Male', 'Non-Binary', 'Other'].map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <input type="checkbox" id={`gender-${gender}`} className="rounded" />
                  <label htmlFor={`gender-${gender}`} className="text-sm">{gender}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t p-4 flex justify-between">
          <Button variant="outline" onClick={onResetFilters}>Reset</Button>
          <Button onClick={onApplyFilters}>Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
