
// Escort filter options
export const ESCORT_BODY_TYPE_OPTIONS = [
  { value: 'slim', label: 'Slim' },
  { value: 'athletic', label: 'Athletic' },
  { value: 'average', label: 'Average' },
  { value: 'curvy', label: 'Curvy' },
  { value: 'full', label: 'Full-Figured' },
  { value: 'muscular', label: 'Muscular' },
];

export const ESCORT_ETHNICITY_OPTIONS = [
  { value: 'asian', label: 'Asian' },
  { value: 'black', label: 'Black' },
  { value: 'caucasian', label: 'Caucasian' },
  { value: 'hispanic', label: 'Hispanic' },
  { value: 'indian', label: 'Indian' },
  { value: 'middle_eastern', label: 'Middle Eastern' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'other', label: 'Other' },
];

export const ESCORT_EYE_COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue' },
  { value: 'brown', label: 'Brown' },
  { value: 'green', label: 'Green' },
  { value: 'hazel', label: 'Hazel' },
  { value: 'grey', label: 'Grey' },
  { value: 'other', label: 'Other' },
];

export const ESCORT_HAIR_COLOR_OPTIONS = [
  { value: 'black', label: 'Black' },
  { value: 'blonde', label: 'Blonde' },
  { value: 'brown', label: 'Brown' },
  { value: 'red', label: 'Red' },
  { value: 'grey', label: 'Grey' },
  { value: 'white', label: 'White' },
  { value: 'blue', label: 'Blue' },
  { value: 'pink', label: 'Pink' },
  { value: 'purple', label: 'Purple' },
  { value: 'multi', label: 'Multi-Colored' },
  { value: 'other', label: 'Other' },
];

export const ESCORT_LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'other', label: 'Other' },
];

// Enhanced escort filters interface
export interface EnhancedEscortFilters {
  location: string;
  serviceType: string[];
  price: [number, number];
  gender: string[];
  orientation: string[];
  age: [number, number];
  rating: number;
  verified: boolean;
  availableNow: boolean;
  escortType: string;
  languages: string[];
  height: [number, number];
  bodyType: string[];
  hairColor: string[];
  eyeColor: string[];
  ethnicity: string[];
  availability: {
    days: string[];
    hours: string[];
    customNotes?: string;
  };
  sortBy: string;
  useBoostSorting: boolean;
}
