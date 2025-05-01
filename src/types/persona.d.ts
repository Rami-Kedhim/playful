
export interface PersonaSearchParams {
  query?: string;
  type?: string;
  status?: string;
  tags?: string[];
  verified?: boolean;
  limit?: number;
  offset?: number;
  page?: number; // Add this missing property
  sort?: string;
  location?: string;
  gender?: string;
  minRating?: number;
  services?: string[];
  features?: string[];
}
