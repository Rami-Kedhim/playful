
import React, { useState, useEffect } from 'react';
import { usePersona } from '@/modules/personas/hooks/usePersona';
import { UberPersona } from '@/types/uberPersona';
import PersonaGrid from '@/components/personas/PersonaGrid';

// Mock components for FilterPanel and PersonaPanel
const FilterPanel = () => <div>Filter Panel (placeholder)</div>;
const PersonaPanel = () => <div>Persona Panel (placeholder)</div>;

// Mock hook for persona filters
const usePersonaFilters = () => {
  return {
    filters: {
      searchQuery: '',
      types: [],
      tags: [],
      verifiedOnly: false,
      onlineOnly: false,
      premiumOnly: false,
    },
    setFilters: () => {},
    clearFilters: () => {},
  };
};

const Personas = () => {
  const { persona, loading, error, searchPersonas } = usePersona();
  const [personaList, setPersonaList] = useState<UberPersona[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const filters = usePersonaFilters();
  
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        // Use the personaService directly since we don't have access to the hook method
        const result = await searchPersonas({ page: 1, limit: 12 });
        setPersonaList(result.data);
      } catch (err) {
        console.error('Failed to fetch personas', err);
      }
    };
    
    fetchPersonas();
  }, []);
  
  const handlePersonaClick = (id: string) => {
    setSelectedId(id);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Personas</h1>
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <FilterPanel />
        </div>
        
        <div className="col-span-9">
          <PersonaGrid
            personas={personaList}
            onPersonaClick={handlePersonaClick}
            loading={loading}
          />
        </div>
      </div>
      
      {selectedId && (
        <PersonaPanel />
      )}
    </div>
  );
};

export default Personas;
