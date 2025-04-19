import React from 'react';
import { useUberPersonaContext } from '@/contexts/UberPersonaContext';
import { UberPersona } from '@/types/UberPersona';
// Removed import of missing PersonaContentTab
import PersonaOverviewTab from '@/components/persona/tabs/PersonaOverviewTab'; // existing tab
import PersonaDetailsTab from '@/components/persona/tabs/PersonaDetailsTab'; // example other tab

const PersonaPage = () => {
  const { escortPersonas, creatorPersonas, livecamPersonas, aiPersonas } = useUberPersonaContext();

  // Adjust filter for persona type using roleFlags as 'type' doesn't exist on UberPersona
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
