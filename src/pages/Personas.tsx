
// Fix import for default usePersonaFilter and adjust filterOptions accordingly
import React, { useEffect, useState } from 'react';
import { UberPersona } from '@/types/UberPersona';
import UberPersonaGrid from '@/components/personas/UberPersonaGrid';
import { mapEscortsToUberPersonas } from '@/utils/profileMapping';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import EnhancedAppLayout from '@/components/layout/EnhancedAppLayout';
import usePersonaFilter from '@/hooks/usePersonaFilter';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import FilterBadge from '@/components/escorts/FilterBadge';
import type { CheckedState } from '@radix-ui/react-checkbox';

const PersonasPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allPersonas, setAllPersonas] = useState<UberPersona[]>([]);
  const { loadEscorts, state } = useEscortContext();

  const { filteredPersonas, filterOptions, updateFilterOptions } = usePersonaFilter(allPersonas);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (state.escorts.length === 0) {
          await loadEscorts(true);
        }

        const mappedPersonas = mapEscortsToUberPersonas(state.escorts);
        setAllPersonas(mappedPersonas);

        // Pass mappedPersonas to updateFilterOptions if necessary
        updateFilterOptions?.({ personas: mappedPersonas });
      } catch (error) {
        console.error('Error loading personas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.escorts.length, loadEscorts, updateFilterOptions]);

  const getActiveFilters = () => {
    const filters: Array<{ key: string; label: string }> = [];

    if (filterOptions.location) {
      filters.push({ key: 'location', label: `Location: ${filterOptions.location}` });
    }

    if (filterOptions.role_filters) {
      Object.entries(filterOptions.role_filters).forEach(([role, active]) => {
        if (active) filters.push({ key: role, label: role.replace(/^is/, '') });
      });
    }

    if (filterOptions.capability_filters) {
      Object.entries(filterOptions.capability_filters).forEach(([capability, active]) => {
        if (active) filters.push({ key: capability, label: capability.replace(/^has/, '') });
      });
    }

    return filters;
  };

  const handleRemoveFilter = (key: string) => {
    if (key === 'location') {
      updateFilterOptions({ location: '' });
    } else if (filterOptions.role_filters && key in filterOptions.role_filters) {
      updateFilterOptions({ role_filters: { ...filterOptions.role_filters, [key]: false } });
    } else if (filterOptions.capability_filters && key in filterOptions.capability_filters) {
      updateFilterOptions({ capability_filters: { ...filterOptions.capability_filters, [key]: false } });
    }
  };

  const clearAllFilters = () => {
    updateFilterOptions({
      location: '',
      role_filters: {},
      capability_filters: {},
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
                  value={filterOptions.search_query || ''}
                  onChange={(e) => updateFilterOptions({ search_query: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Filter by location..."
                  value={filterOptions.location || ''}
                  onChange={(e) => updateFilterOptions({ location: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="mb-2 block">Role Types</Label>
                <div className="space-y-2">
                  {filterOptions.role_filters &&
                    Object.entries(filterOptions.role_filters).map(([role, active]) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role}`}
                          checked={active as boolean}
                          onCheckedChange={() => {
                            const newFilters = {
                              ...filterOptions.role_filters,
                              [role]: !active,
                            };
                            updateFilterOptions({ role_filters: newFilters });
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
                  {filterOptions.capability_filters &&
                    Object.entries(filterOptions.capability_filters).map(([capability, active]) => (
                      <div key={capability} className="flex items-center space-x-2">
                        <Checkbox
                          id={`capability-${capability}`}
                          checked={active as boolean}
                          onCheckedChange={() => {
                            const newCaps = {
                              ...filterOptions.capability_filters,
                              [capability]: !active,
                            };
                            updateFilterOptions({ capability_filters: newCaps });
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

export default PersonasPage;

