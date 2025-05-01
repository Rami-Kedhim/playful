
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PersonaFilters } from '@/hooks/usePersonaFilters';

interface FilterPanelProps {
  filters: PersonaFilters;
  onFiltersChange: (filters: Partial<PersonaFilters>) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFiltersChange,
  onClearFilters
}) => {
  const locationOptions = [
    { key: 'new-york', label: 'New York' },
    { key: 'london', label: 'London' },
    { key: 'los-angeles', label: 'Los Angeles' },
    { key: 'paris', label: 'Paris' },
  ];
  
  const roleOptions = [
    { key: 'escort', label: 'Escort' },
    { key: 'creator', label: 'Creator' },
    { key: 'model', label: 'Model' },
    { key: 'companion', label: 'Companion' },
    { key: 'ai', label: 'AI' },
  ];
  
  const capabilityOptions = [
    { key: 'real-meets', label: 'Real Meets' },
    { key: 'virtual-meets', label: 'Virtual Meets' },
    { key: 'video-calls', label: 'Video Calls' },
    { key: 'photos', label: 'Photo Content' },
    { key: 'videos', label: 'Video Content' },
  ];
  
  const handleLocationChange = (location: string) => {
    onFiltersChange({ location });
  };
  
  const handleRoleToggle = (role: string) => {
    const roleFilters = [...(filters.roleFilters || [])];
    if (roleFilters.includes(role)) {
      onFiltersChange({ 
        roleFilters: roleFilters.filter(r => r !== role) 
      });
    } else {
      onFiltersChange({ 
        roleFilters: [...roleFilters, role] 
      });
    }
  };
  
  const handleCapabilityToggle = (capability: string) => {
    const capabilityFilters = [...(filters.capabilityFilters || [])];
    if (capabilityFilters.includes(capability)) {
      onFiltersChange({ 
        capabilityFilters: capabilityFilters.filter(c => c !== capability) 
      });
    } else {
      onFiltersChange({ 
        capabilityFilters: [...capabilityFilters, capability] 
      });
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ searchQuery: e.target.value });
  };
  
  const handleVerifiedChange = (checked: boolean) => {
    onFiltersChange({ verifiedOnly: checked });
  };
  
  const handleOnlineChange = (checked: boolean) => {
    onFiltersChange({ onlineOnly: checked });
  };
  
  const handlePremiumChange = (checked: boolean) => {
    onFiltersChange({ premiumOnly: checked });
  };
  
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Filters</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input 
            id="search"
            placeholder="Search personas..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Location</Label>
          <div className="grid grid-cols-2 gap-2">
            {locationOptions.map((location) => (
              <div key={location.key} className="flex items-center space-x-2">
                <Checkbox 
                  id={`location-${location.key}`} 
                  checked={filters.location === location.key}
                  onCheckedChange={() => handleLocationChange(location.key)}
                />
                <Label 
                  htmlFor={`location-${location.key}`}
                  className="text-sm"
                >
                  {location.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Persona Type</Label>
          <div className="space-y-2">
            {roleOptions.map((role) => (
              <div key={role.key} className="flex items-center space-x-2">
                <Checkbox 
                  id={`role-${role.key}`} 
                  checked={filters.roleFilters?.includes(role.key)}
                  onCheckedChange={() => handleRoleToggle(role.key)}
                />
                <Label 
                  htmlFor={`role-${role.key}`}
                  className="text-sm"
                >
                  {role.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Capabilities</Label>
          <div className="space-y-2">
            {capabilityOptions.map((capability) => (
              <div key={capability.key} className="flex items-center space-x-2">
                <Checkbox 
                  id={`capability-${capability.key}`} 
                  checked={filters.capabilityFilters?.includes(capability.key)}
                  onCheckedChange={() => handleCapabilityToggle(capability.key)}
                />
                <Label 
                  htmlFor={`capability-${capability.key}`}
                  className="text-sm"
                >
                  {capability.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Additional Filters</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified" 
                checked={filters.verifiedOnly}
                onCheckedChange={(checked) => handleVerifiedChange(!!checked)}
              />
              <Label htmlFor="verified" className="text-sm">Verified Only</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="online" 
                checked={filters.onlineOnly}
                onCheckedChange={(checked) => handleOnlineChange(!!checked)}
              />
              <Label htmlFor="online" className="text-sm">Online Now</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="premium" 
                checked={filters.premiumOnly}
                onCheckedChange={(checked) => handlePremiumChange(!!checked)}
              />
              <Label htmlFor="premium" className="text-sm">Premium Only</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
