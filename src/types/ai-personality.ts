
export interface PersonalityTrait {
  name: string;
  description: string;
  intensity: number;
}

export interface PersonalityProfile {
  traits: PersonalityTrait[];
  dominantTrait?: string;
  compatibility?: {
    matchScore: number;
    matchTraits: string[];
  };
}
