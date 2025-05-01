
// Re-export common types from the main types folder
export * from '@/types/uberPersona';

export interface PersonaSearchParams {
  query?: string;
  location?: string;
  type?: string[];
  tags?: string[];
  isVerified?: boolean;
  isOnline?: boolean;
  isPremium?: boolean;
  limit?: number;
  offset?: number;
}

export interface PersonaServiceResponse<T> {
  data: T;
  meta?: {
    total?: number;
    limit?: number;
    offset?: number;
  };
  error?: string;
}
