
// Fix imports for PersonaOverviewTab and PersonaDetailsTab (assumed paths fixed or created)
// Also fix access to properties in UberPersona properly
import React from 'react';
import { useUberPersonaContext } from '@/contexts/UberPersonaContext';
import { UberPersona } from '@/types/UberPersona';
import PersonaOverviewTab from '@/components/personas/tabs/PersonaOverviewTab';
import PersonaDetailsTab from '@/components/personas/tabs/PersonaDetailsTab';

const PersonaPage = () => {
  const { escortPersonas, creatorPersonas, livecamPersonas, aiPersonas } = useUberPersonaContext();

  const escorts = escortPersonas;
  const creators = creatorPersonas;
  const livecams = livecamPersonas;
  const aiList = aiPersonas;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Personas Overview</h1>

      <PersonaOverviewTab personas={escorts} />

      <PersonaDetailsTab personas={creators} />

      {/* Could add other tabs similarly */}
    </div>
  );
};
export default PersonaPage;

