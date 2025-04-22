import { generateBulkAIProfiles } from '@/services/ai/aiProfilesService';

const someFunctionUsingAIProfiles = async () => {
  // example usage adjusted
  const profiles = await generateBulkAIProfiles([
    // ... params
  ]);

  // If responseStyle property usage exists, we remove or handle it, 
  // can't fix exactly without full context but we can suppress or remove:
  const examplePersona = { type: 'default' };
  // Removed usage of examplePersona.responseStyle because it doesn't exist
  return profiles;
};

export default someFunctionUsingAIProfiles;
