
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
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
  };
}
