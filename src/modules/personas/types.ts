
import { UberPersona } from '@/types/uberPersona';

export const PERSONA_TYPES = ['escort', 'creator', 'livecam', 'ai'] as const;
export type PersonaType = typeof PERSONA_TYPES[number];

export interface PersonaFilter {
  type?: PersonaType[];
  gender?: string[];
  age?: [number, number];
  languages?: string[];
  location?: string;
  rating?: number;
  verified?: boolean;
  price?: [number, number];
  availability?: string[];
  services?: string[];
}

export interface PersonaListParams {
  page?: number;
  limit?: number;
  filter?: PersonaFilter;
  sort?: string;
  search?: string;
}

export interface PersonaListResult {
  items: UberPersona[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
