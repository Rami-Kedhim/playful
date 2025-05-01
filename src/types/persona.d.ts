
export interface PersonaSearchParams {
  query?: string;
  type?: string;
  status?: string;
  tags?: string[];
  verified?: boolean;
  limit?: number;
  offset?: number;
  page?: number;
  sort?: string;
  location?: string;
  gender?: string;
  minRating?: number;
  services?: string[];
  features?: string[];
  filters?: {
    searchQuery: string;
    types: string[];
    tags: string[];
    verifiedOnly: boolean;
    onlineOnly: boolean;
    premiumOnly: boolean;
    location?: string;
    roleFilters?: string[];
    capabilityFilters?: string[];
  };
  pageSize?: number;
}
