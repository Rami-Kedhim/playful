
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Search, Filter, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { usePersonaFilters } from '@/hooks/usePersonaFilters';
import { usePersona } from '@/modules/personas/hooks';
import { PersonaGrid } from '@/components/personas/PersonaGrid';
import { PersonaPanel } from '@/components/personas/PersonaPanel';
import { FilterPanel } from '@/components/personas/FilterPanel';

const Personas: React.FC = () => {
  const personaFilters = usePersonaFilters();
  const { filters, updateFilters } = personaFilters;
  const { personas, loading, error } = usePersona({ 
    filters: { ...filters },
    pageSize: 20
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchQuery: e.target.value });
  };

  const handleClearSearch = () => {
    updateFilters({ searchQuery: '' });
  };

  // Location filters
  const locationOptions = [
    { key: 'us', label: 'United States' },
    { key: 'eu', label: 'Europe' },
    { key: 'asia', label: 'Asia' },
    { key: 'global', label: 'Global' }
  ];

  // Role filters
  const roleFilterOptions = [
    { key: 'escort', label: 'Escort' },
    { key: 'model', label: 'Model' },
    { key: 'companion', label: 'Companion' },
    { key: 'creator', label: 'Content Creator' }
  ];

  // Capability filters
  const capabilityFilterOptions = [
    { key: 'massage', label: 'Massage' },
    { key: 'dinner', label: 'Dinner Date' },
    { key: 'travel', label: 'Travel Companion' },
    { key: 'event', label: 'Event Partner' }
  ];

  const handleLocationChange = (location: string) => {
    updateFilters({ location });
  };

  const handleRoleFilterToggle = (role: string) => {
    const currentRoleFilters = [...(filters.roleFilters || [])];
    const index = currentRoleFilters.indexOf(role);
    
    if (index >= 0) {
      currentRoleFilters.splice(index, 1);
    } else {
      currentRoleFilters.push(role);
    }
    
    updateFilters({ roleFilters: currentRoleFilters });
  };

  const handleCapabilityFilterToggle = (capability: string) => {
    const currentCapabilityFilters = [...(filters.capabilityFilters || [])];
    const index = currentCapabilityFilters.indexOf(capability);
    
    if (index >= 0) {
      currentCapabilityFilters.splice(index, 1);
    } else {
      currentCapabilityFilters.push(capability);
    }
    
    updateFilters({ capabilityFilters: currentCapabilityFilters });
  };

  const handleToggleVerified = () => {
    updateFilters({ verifiedOnly: !filters.verifiedOnly });
  };

  const renderSearchBar = () => (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search personas..."
        className="pl-8 pr-10"
        value={filters.searchQuery}
        onChange={handleSearchChange}
      />
      {filters.searchQuery && (
        <button
          onClick={handleClearSearch}
          className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  const renderLocationFilter = () => (
    <div className="mt-4">
      <h3 className="mb-2 font-medium">Location</h3>
      <div className="flex flex-wrap gap-2">
        {locationOptions.map(location => (
          <Button
            key={location.key}
            variant={filters.location === location.key ? "default" : "outline"}
            size="sm"
            onClick={() => handleLocationChange(location.key)}
          >
            {location.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderRoleFilters = () => (
    <div className="mt-4">
      <h3 className="mb-2 font-medium">Role</h3>
      <div className="space-y-2">
        {roleFilterOptions.map(role => (
          <div key={role.key} className="flex items-center space-x-2">
            <Checkbox 
              id={`role-${role.key}`} 
              checked={(filters.roleFilters || []).includes(role.key)}
              onCheckedChange={() => handleRoleFilterToggle(role.key)}
            />
            <label
              htmlFor={`role-${role.key}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {role.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCapabilityFilters = () => (
    <div className="mt-4">
      <h3 className="mb-2 font-medium">Services</h3>
      <div className="space-y-2">
        {capabilityFilterOptions.map(capability => (
          <div key={capability.key} className="flex items-center space-x-2">
            <Checkbox 
              id={`capability-${capability.key}`} 
              checked={(filters.capabilityFilters || []).includes(capability.key)}
              onCheckedChange={() => handleCapabilityFilterToggle(capability.key)}
            />
            <label
              htmlFor={`capability-${capability.key}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {capability.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <Card className="w-full md:w-64 p-4 h-fit sticky top-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" /> 
              {showFilters ? "Hide" : "Show"}
            </Button>
          </div>
          
          <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
            {renderSearchBar()}
            
            <div className="mt-4">
              <h3 className="mb-2 font-medium">Verification</h3>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="verified-only" 
                  checked={filters.verifiedOnly} 
                  onCheckedChange={handleToggleVerified} 
                />
                <label
                  htmlFor="verified-only"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Verified Only
                </label>
              </div>
            </div>
            
            {renderLocationFilter()}
            {renderRoleFilters()}
            {renderCapabilityFilters()}
          </div>
        </Card>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Personas</h1>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                {loading ? "Loading..." : `${personas.length} results`}
              </span>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <PersonaGrid personas={personas} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Personas;
