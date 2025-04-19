
import React from 'react';
import { useUberPersonaContext } from '@/contexts/UberPersonaContext';
import { UberPersona } from '@/types/UberPersona';

// Comment out missing imports since these components are missing as per errors
// import PersonaOverviewTab from '@/components/personas/tabs/PersonaOverviewTab';
// import PersonaDetailsTab from '@/components/personas/tabs/PersonaDetailsTab';

const PersonaPage = () => {
  const { escortPersonas, creatorPersonas, livecamPersonas, aiPersonas } = useUberPersonaContext();

  const escorts = escortPersonas;
  const creators = creatorPersonas;
  const livecams = livecamPersonas;
  const aiList = aiPersonas;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Personas Overview</h1>

      {/* Temporarily remove missing components until implemented */}
      {/* <PersonaOverviewTab personas={escorts} /> */}

      {/* <PersonaDetailsTab personas={creators} /> */}

      {/* Could add other tabs similarly */}
    </div>
  );
};
export default PersonaPage;

