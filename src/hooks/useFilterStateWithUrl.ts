
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

/**
 * Interface for filter fields that can be synchronized with URL parameters
 */
export interface UrlSyncedFilterState {
  serviceTypeFilter?: ServiceTypeFilter;
  verifiedOnly?: boolean;
  availableNow?: boolean;
  location?: string;
  searchQuery?: string;
  ratingMin?: number;
  [key: string]: any; // Allow additional filter properties
}

/**
 * Hook to synchronize filter state with URL parameters
 */
export const useFilterStateWithUrl = <T extends UrlSyncedFilterState>({
  filters,
  setFilters,
  defaultValues
}: {
  filters: T;
  setFilters: (filters: T) => void;
  defaultValues: T;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Load filters from URL on mount
  useEffect(() => {
    const newFilters = { ...defaultValues };
    let hasChanges = false;

    // Handle service type filter
    const serviceType = searchParams.get('service_type') as ServiceTypeFilter;
    if (serviceType && ['in-person', 'virtual', 'both', 'any'].includes(serviceType)) {
      newFilters.serviceTypeFilter = serviceType;
      hasChanges = true;
    }

    // Handle verified only filter
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      newFilters.verifiedOnly = true;
      hasChanges = true;
    }

    // Handle available now filter
    const available = searchParams.get('available');
    if (available === 'true') {
      newFilters.availableNow = true;
      hasChanges = true;
    }

    // Handle location filter
    const location = searchParams.get('location');
    if (location) {
      newFilters.location = location;
      hasChanges = true;
    }

    // Handle search query
    const query = searchParams.get('q');
    if (query) {
      newFilters.searchQuery = query;
      hasChanges = true;
    }

    // Handle rating filter
    const rating = searchParams.get('rating');
    if (rating) {
      newFilters.ratingMin = parseInt(rating, 10);
      hasChanges = true;
    }

    if (hasChanges) {
      setFilters(newFilters as T);
    }
  }, [searchParams, defaultValues, setFilters]);

  // Update URL when filters change
  const updateUrl = (newFilters: T) => {
    const params = new URLSearchParams();

    // Add service type filter to URL
    if (newFilters.serviceTypeFilter) {
      params.set('service_type', newFilters.serviceTypeFilter);
    }

    // Add verified only filter to URL
    if (newFilters.verifiedOnly) {
      params.set('verified', 'true');
    }

    // Add available now filter to URL
    if (newFilters.availableNow) {
      params.set('available', 'true');
    }

    // Add location filter to URL
    if (newFilters.location) {
      params.set('location', newFilters.location);
    }

    // Add search query to URL
    if (newFilters.searchQuery) {
      params.set('q', newFilters.searchQuery);
    }

    // Add rating filter to URL
    if (newFilters.ratingMin && newFilters.ratingMin > 0) {
      params.set('rating', newFilters.ratingMin.toString());
    }

    setSearchParams(params, { replace: true });
  };

  return {
    updateUrl
  };
};

export default useFilterStateWithUrl;
