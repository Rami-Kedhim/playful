
import { useState } from 'react';
import { UberPersona } from '@/types/uberPersona';

export const useUberPersona = () => {
  const [personas, setPersonas] = useState<UberPersona[]>([
    {
      id: '1',
      name: 'Sophia',
      type: 'companion',
      personality: 'flirty',
      traits: ['charming', 'witty', 'intellectual'],
      interests: ['philosophy', 'art', 'literature'],
      rating: 4.9,
      mood: 'cheerful',
      energyLevel: 85
    },
    {
      id: '2',
      name: 'Alex',
      type: 'assistant',
      personality: 'professional',
      traits: ['efficient', 'knowledgeable', 'precise'],
      interests: ['technology', 'business', 'science'],
      rating: 4.8,
      mood: 'focused',
      energyLevel: 90
    },
    {
      id: '3',
      name: 'Luna',
      type: 'roleplay',
      personality: 'playful',
      traits: ['imaginative', 'spontaneous', 'adventurous'],
      interests: ['fantasy', 'gaming', 'storytelling'],
      rating: 4.7,
      mood: 'whimsical',
      energyLevel: 95
    },
    {
      id: '4',
      name: 'Max',
      type: 'personal trainer',
      personality: 'motivational',
      traits: ['energetic', 'disciplined', 'supportive'],
      interests: ['fitness', 'nutrition', 'self-improvement'],
      rating: 4.9,
      mood: 'energized',
      energyLevel: 100
    }
  ]);
  
  return { personas };
};

export default useUberPersona;
