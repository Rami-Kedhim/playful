
// Removed invalid import of generateBulkAIProfiles and code referencing undefined generateAIProfile

import { getAIProfiles } from '@/services/ai/aiProfilesService';

const someFunctionUsingAIProfiles = async () => {
  // example usage adjusted
  const profiles = await getAIProfiles();

  // Removed usage of examplePersona.responseStyle because it doesn't exist
  return profiles;
};

export default someFunctionUsingAIProfiles;

