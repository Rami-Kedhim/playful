
// Define database gender types
export enum DatabaseGender {
  FEMALE = 'female',
  MALE = 'male',
  TRANSGENDER_FEMALE = 'transgender_female',
  TRANSGENDER_MALE = 'transgender_male',
  NON_BINARY = 'non_binary',
  OTHER = 'other'
}

// Gender options for UI
export const GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'transgender_female', label: 'Transgender Female' },
  { value: 'transgender_male', label: 'Transgender Male' },
  { value: 'non_binary', label: 'Non-Binary' },
  { value: 'other', label: 'Other' }
];

// Map display name to database value
export const mapGenderToDatabase = (gender: string): string => {
  switch (gender.toLowerCase()) {
    case 'female':
      return 'female';
    case 'male':
      return 'male';
    case 'transgender female':
      return 'transgender_female';
    case 'transgender male':
      return 'transgender_male';
    case 'non-binary':
    case 'nonbinary':
      return 'non_binary';
    default:
      return 'other';
  }
};

// Map database value to display name
export const mapGenderFromDatabase = (gender: string): string => {
  switch (gender) {
    case 'female':
      return 'Female';
    case 'male':
      return 'Male';
    case 'transgender_female':
      return 'Transgender Female';
    case 'transgender_male':
      return 'Transgender Male';
    case 'non_binary':
      return 'Non-Binary';
    default:
      return 'Other';
  }
};

// Format age range for display
export const formatAgeRange = (min: number, max: number): string => {
  if (min === max) return `${min}`;
  if (min === 18 && max === 99) return 'Any age';
  if (min === 18) return `Up to ${max}`;
  if (max === 99) return `${min}+`;
  return `${min} - ${max}`;
};

// Format price range for display
export const formatPriceRange = (min: number, max: number): string => {
  if (min === 0 && max === 1000) return 'Any price';
  if (min === 0) return `Up to $${max}`;
  if (max === 1000) return `$${min}+`;
  return `$${min} - $${max}`;
};
