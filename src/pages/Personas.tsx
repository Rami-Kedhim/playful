import React, { useEffect, useState } from 'react';
import { UberPersona } from '@/types/uberPersona';
import UberPersonaGrid from '@/components/personas/UberPersonaGrid';
import { mapEscortToUberPersona } from '@/utils/profileMapping';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import EnhancedAppLayout from '@/components/layout/EnhancedAppLayout';
import usePersonaFilter from '@/hooks/usePersonaFilter';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import FilterBadge from '@/components/escorts/FilterBadge';

const Personas: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allPersonas, setAllPersonas] = useState<UberPersona[]>([]);
  const { loadEscorts, state } = useEscortContext();

  const { filters, updateFilters, filteredPersonas, loading, error } = usePersonaFilter(allPersonas);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (state.escorts.length === 0) {
          await loadEscorts(true);
        }

        const mappedPersonas = state.escorts.map(escort => {
          const mapped = mapEscortToUberPersona(escort);
          return {
            ...mapped,
            type: mapped.type as 'escort' | 'creator' | 'livecam' | 'ai'
          };
        });
        setAllPersonas(mappedPersonas);

        updateFilters({
          searchTerm: '',
          location: '',
          roleFilters: {},
          capabilityFilters: {}
        });
      } catch (error) {
        console.error('Error loading personas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.escorts.length, loadEscorts, updateFilters]);

  const getActiveFilters = () => {
    const filters: Array<{ key: string; label: string }> = [];

    if (filters.location) {
      filters.push({ key: 'location', label: `Location: ${filters.location}` });
    }

    if (filters.roleFilters) {
      Object.entries(filters.roleFilters).forEach(([role, active]) => {
        if (active) filters.push({ key: role, label: role.replace(/^is/, '') });
      });
    }

    if (filters.capabilityFilters) {
      Object.entries(filters.capabilityFilters).forEach(([capability, active]) => {
        if (active) filters.push({ key: capability, label: capability.replace(/^has/, '') });
      });
    }

    return filters;
  };

  const handleRemoveFilter = (key: string) => {
    if (key === 'location') {
      updateFilters({ location: '' });
    } else if (filters.roleFilters && key in filters.roleFilters) {
      updateFilters({ roleFilters: { ...filters.roleFilters, [key]: false } });
    } else if (filters.capabilityFilters && key in filters.capabilityFilters) {
      updateFilters({ capabilityFilters: { ...filters.capabilityFilters, [key]: false } });
    }
  };

  const clearAllFilters = () => {
    updateFilters({
      searchTerm: '',
      location: '',
      roleFilters: {},
      capabilityFilters: {},
    });
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
                  value={filters.searchTerm || ''}
                  onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Filter by location..."
                  value={filters.location || ''}
                  onChange={(e) => updateFilters({ location: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="mb-2 block">Role Types</Label>
                <div className="space-y-2">
                  {filters.roleFilters && Object.entries(filters.roleFilters).map(([role, active]) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role}`}
                        checked={active as boolean}
                        onCheckedChange={() => {
                          const newFilters = {
                            ...filters.roleFilters,
                            [role]: !active,
                          };
                          updateFilters({ roleFilters: newFilters });
                        }}
                      />
                      <Label htmlFor={`role-${role}`} className="capitalize">
                        {role.replace(/^is/, '')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Capabilities</Label>
                <div className="space-y-2">
                  {filters.capabilityFilters && Object.entries(filters.capabilityFilters).map(([capability, active]) => (
                    <div key={capability} className="flex items-center space-x-2">
                      <Checkbox
                        id={`capability-${capability}`}
                        checked={active as boolean}
                        onCheckedChange={() => {
                          const newCaps = {
                            ...filters.capabilityFilters,
                            [capability]: !active,
                          };
                          updateFilters({ capabilityFilters: newCaps });
                        }}
                      />
                      <Label htmlFor={`capability-${capability}`} className="capitalize">
                        {capability.replace(/^has/, '')}
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
                <FilterBadge key={filter.key} label={filter.label} onRemove={() => handleRemoveFilter(filter.key)} />
              ))}

              {getActiveFilters().length > 0 && (
                <button onClick={clearAllFilters} className="text-sm text-blue-500 hover:underline">
                  Clear all filters
                </button>
              )}
            </div>

            <UberPersonaGrid
              personas={filteredPersonas || []}
              loading={loading}
              emptyMessage="No personas found. Please try adjusting your filters."
            />
          </div>
        </div>
      </div>
    </EnhancedAppLayout>
  );
};

export default Personas;
