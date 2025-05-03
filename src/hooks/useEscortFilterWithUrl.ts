
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEscortFilter } from '@/hooks/useEscortFilter';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { Escort } from '@/types/Escort';

interface UseEscortFilterWithUrlProps {
  escorts: Escort[];
}

export const useEscortFilterWithUrl = ({ escorts }: UseEscortFilterWithUrlProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const updatingUrlRef = useRef(false);
  const filterState = useEscortFilter({ escorts });
  
  // Load filters from URL on mount only once
  useEffect(() => {
    if (initialLoadComplete) return;
    
    // Get filter values from URL parameters
    const serviceType = searchParams.get('serviceType') as ServiceTypeFilter;
    const verified = searchParams.get('verified') === 'true';
    const available = searchParams.get('available') === 'true';
    const location = searchParams.get('location') || '';
    const query = searchParams.get('q') || '';
    const rating = searchParams.get('rating');
    
    // Flag to track if any filter was applied from URL
    let filtersApplied = false;
    
    // Only apply filters that actually exist in the URL
    if (serviceType && ['in-person', 'virtual', 'both'].includes(serviceType)) {
      filterState.setServiceTypeFilter(serviceType);
      filtersApplied = true;
    }
    
    if (verified) {
      filterState.setVerifiedOnly(true);
      filtersApplied = true;
    }
    
    if (available) {
      filterState.setAvailableNow(true);
      filtersApplied = true;
    }
    
    if (location) {
      filterState.setLocation(location);
      filtersApplied = true;
    }
    
    if (query) {
      filterState.setSearchQuery(query);
      filtersApplied = true;
    }
    
    if (rating) {
      filterState.setRatingMin(parseInt(rating, 10));
      filtersApplied = true;
    }
    
    // Only mark as complete if we've actually processed URL parameters
    // This prevents unnecessary re-renders
    if (filtersApplied || !searchParams.toString()) {
      setInitialLoadComplete(true);
    }
  }, [searchParams, filterState, initialLoadComplete]);
  
  // Update URL when filters change, but only after initial load is complete
  const updateUrlFromFilters = useCallback(() => {
    if (!initialLoadComplete || updatingUrlRef.current) return;
    
    updatingUrlRef.current = true;
    
    try {
      // Use a shallow copy of current params to avoid direct modification
      const params = new URLSearchParams(searchParams.toString());
      
      // Clear existing filter params first
      params.delete('serviceType');
      params.delete('verified');
      params.delete('available'); 
      params.delete('location');
      params.delete('q');
      params.delete('rating');
      
      // Only set parameters for active filters
      if (filterState.serviceTypeFilter) {
        params.set('serviceType', filterState.serviceTypeFilter);
      }
      
      if (filterState.verifiedOnly) {
        params.set('verified', 'true');
      }
      
      if (filterState.availableNow) {
        params.set('available', 'true');
      }
      
      if (filterState.location) {
        params.set('location', filterState.location);
      }
      
      if (filterState.searchQuery) {
        params.set('q', filterState.searchQuery);
      }
      
      if (filterState.ratingMin > 0) {
        params.set('rating', filterState.ratingMin.toString());
      }
      
      // Compare current and new params to avoid unnecessary history entries
      const currentParamsString = searchParams.toString();
      const newParamsString = params.toString();
      
      if (currentParamsString !== newParamsString) {
        // Use { replace: true } to avoid adding to browser history
        setSearchParams(params, { replace: true });
      }
    } finally {
      // Make sure we always reset this flag
      setTimeout(() => {
        updatingUrlRef.current = false;
      }, 0);
    }
  }, [
    filterState.serviceTypeFilter,
    filterState.verifiedOnly,
    filterState.availableNow,
    filterState.location,
    filterState.searchQuery,
    filterState.ratingMin,
    setSearchParams,
    initialLoadComplete,
    searchParams
  ]);
  
  // Use effect to call the memoized update function
  useEffect(() => {
    if (initialLoadComplete) {
      updateUrlFromFilters();
    }
  }, [
    updateUrlFromFilters,
    initialLoadComplete
  ]);
  
  return filterState;
};

export default useEscortFilterWithUrl;
