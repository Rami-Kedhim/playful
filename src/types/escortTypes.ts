import { Escort } from './escort';

// Enhanced escort filter options
export interface EnhancedEscortFilters {
  location: string;
  serviceTypes: string[];
  priceRange: [number, number];
  gender: string[];
  orientation: string[];
  ageRange: [number, number];
  rating: number;
  verified: boolean;
  availableNow: boolean;
  escortType: "verified" | "ai" | "provisional" | "all";
  language: string[];
  height: [number, number];
  weight: [number, number];
  hairColor: string[];
  eyeColor: string[];
  ethnicity: string[];
  bodyType: string[];
  availability: {
    days: string[];
    hours: string[];
  };
  sortBy: string;
  useBoostSorting: boolean;
}

// Update EscortFilterOptions for backward compatibility
export interface EscortFilterOptions {
  location?: string;
  gender?: string[];
  service?: string[];
  serviceType?: string[];
  serviceTypes?: string[];
  priceRange?: [number, number];
  ageRange?: [number, number];
  language?: string[];
  orientation?: string[];
  maxDistance?: number;
  availability?: string[];
  rating?: number;
  verifiedOnly?: boolean;
  verified?: boolean;
  availableNow?: boolean;
  escortType?: "verified" | "ai" | "provisional" | "all";
  sortBy?: string;
  page?: number;
  limit?: number;
  selectedServices?: string[];
  selectedGenders?: string[];
  languages?: string[];
}

// Booking form data
export interface BookingFormData {
  startTime: Date;
  endTime: Date;
  location: string;
  serviceType: string;
  specialRequests?: string;
  contactPreference: 'email' | 'phone' | 'app';
  agreeToTerms: boolean;
}

// Contact request form data
export interface ContactRequestData {
  name: string;
  email: string;
  message: string;
  subject: string;
  contactPreference: 'email' | 'phone' | 'app';
}

// Review submission data
export interface ReviewSubmissionData {
  escortId: string;
  rating: number;
  title: string;
  content: string;
  anonymous: boolean;
  tags: string[];
}

// Verification badge levels
export enum VerificationBadgeLevel {
  None = 'none',
  Basic = 'basic',
  Enhanced = 'enhanced',
  Premium = 'premium'
}

// Common service types
export const ESCORT_SERVICE_TYPES = [
  'GFE',
  'Massage',
  'Dinner Date',
  'Overnight',
  'Travel Companion',
  'BDSM',
  'Role Play',
  'Fetish',
  'Domination',
  'Submission',
  'Couples',
  'French Kissing',
  'Lingerie Shows',
  'Exotic Dancing'
];

// Escort gender options
export const ESCORT_GENDER_OPTIONS = [
  'female',
  'male',
  'transgender',
  'non-binary'
];

// Escort orientation options
export const ESCORT_ORIENTATION_OPTIONS = [
  'straight',
  'gay',
  'lesbian',
  'bisexual',
  'pansexual'
];

// Escort ethnicity options
export const ESCORT_ETHNICITY_OPTIONS = [
  'caucasian',
  'asian',
  'black',
  'hispanic',
  'middle-eastern',
  'indian',
  'mixed',
  'other'
];

// Escort hair color options
export const ESCORT_HAIR_COLOR_OPTIONS = [
  'blonde',
  'brunette',
  'black',
  'red',
  'grey',
  'other'
];

// Escort eye color options
export const ESCORT_EYE_COLOR_OPTIONS = [
  'blue',
  'green',
  'brown',
  'hazel',
  'grey',
  'other'
];

// Escort body type options
export const ESCORT_BODY_TYPE_OPTIONS = [
  'slim',
  'athletic',
  'average',
  'curvy',
  'plus-size'
];

// Common languages spoken by escorts
export const ESCORT_LANGUAGE_OPTIONS = [
  'english',
  'spanish',
  'french',
  'german',
  'italian',
  'russian',
  'chinese',
  'japanese',
  'arabic',
  'portuguese',
  'hindi',
  'korean'
];
