import React, { useEffect, useState } from 'react';
import { UberPersona } from '@/types/UberPersona';
import UberPersonaGrid from '@/components/personas/UberPersonaGrid';
import { mapEscortsToUberPersonas } from '@/utils/profileMapping';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import EnhancedAppLayout from '@/components/layout/EnhancedAppLayout';
import { usePersonaFilter } from '@/hooks/usePersonaFilter';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import FilterBadge from '@/components/escorts/FilterBadge';

const PersonasPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allPersonas, setAllPersonas] = useState<UberPersona[]>([]);
  const { loadEscorts, state } = useEscortContext();
  
  const {
    filteredPersonas,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    roleFilters,
    toggleRoleFilter,
    capabilityFilters,
    toggleCapabilityFilter
  } = usePersonaFilter({ initialPersonas: allPersonas });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (state.escorts.length === 0) {
          await loadEscorts(true);
        }
        
        const mappedPersonas = mapEscortsToUberPersonas(state.escorts);
        setAllPersonas(mappedPersonas);
      } catch (error) {
        console.error('Error loading personas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.escorts.length, loadEscorts]);

  const getActiveFilters = () => {
    const filters: Array<{ key: string; label: string }> = [];
    
    if (locationFilter) {
      filters.push({ key: 'location', label: `Location: ${locationFilter}` });
    }
    
    Object.entries(roleFilters).forEach(([role, active]) => {
      if (active) {
        filters.push({ key: role, label: role.replace('is', '') });
      }
    });
    
    Object.entries(capabilityFilters).forEach(([capability, active]) => {
      if (active) {
        filters.push({ key: capability, label: capability.replace('has', '') });
      }
    });
    
    return filters;
  };

  return (
    <EnhancedAppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Personas</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 lg:col-span-1">
            <div className="space-y-6">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search personas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Role Types</Label>
                <div className="space-y-2">
                  {Object.entries(roleFilters).map(([role, active]) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`role-${role}`} 
                        checked={active} 
                        onCheckedChange={() => toggleRoleFilter(role as keyof UberPersona['roleFlags'])} 
                      />
                      <Label htmlFor={`role-${role}`} className="capitalize">
                        {role.replace('is', '')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Capabilities</Label>
                <div className="space-y-2">
                  {Object.entries(capabilityFilters).map(([capability, active]) => (
                    <div key={capability} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`capability-${capability}`} 
                        checked={active} 
                        onCheckedChange={() => toggleCapabilityFilter(capability as keyof UberPersona['capabilities'])} 
                      />
                      <Label htmlFor={`capability-${capability}`} className="capitalize">
                        {capability.replace('has', '')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          
          <div className="lg:col-span-3">
            <div className="flex flex-wrap gap-2 mb-4">
              {getActiveFilters().map((filter) => (
                <FilterBadge 
                  key={filter.key} 
                  label={filter.label} 
                  onRemove={() => {
                    if (filter.key === 'location') {
                      setLocationFilter('');
                    } else if (Object.keys(roleFilters).includes(filter.key)) {
                      toggleRoleFilter(filter.key as keyof UberPersona['roleFlags']);
                    } else if (Object.keys(capabilityFilters).includes(filter.key)) {
                      toggleCapabilityFilter(filter.key as keyof UberPersona['capabilities']);
                    }
                  }} 
                />
              ))}
              
              {getActiveFilters().length > 0 && (
                <button 
                  onClick={() => {
                    setLocationFilter('');
                    Object.keys(roleFilters).forEach(role => {
                      if (roleFilters[role]) {
                        toggleRoleFilter(role as keyof UberPersona['roleFlags']);
                      }
                    });
                    Object.keys(capabilityFilters).forEach(capability => {
                      if (capabilityFilters[capability]) {
                        toggleCapabilityFilter(capability as keyof UberPersona['capabilities']);
                      }
                    });
                  }}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <UberPersonaGrid 
              personas={filteredPersonas} 
              loading={loading} 
              emptyMessage="No personas found. Please try adjusting your filters." 
            />
          </div>
        </div>
      </div>
    </EnhancedAppLayout>
  );
};

export default PersonasPage;
