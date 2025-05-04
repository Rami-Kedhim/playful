
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
  const filterUpdateFromUrlRef = useRef(false);
  const filterState = useEscortFilter({ escorts });
  
  // Load filters from URL on mount only once
  useEffect(() => {
    if (initialLoadComplete || filterUpdateFromUrlRef.current) return;
    
    filterUpdateFromUrlRef.current = true;
    
    try {
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
      if (serviceType && ['in-person', 'virtual', 'both', 'any'].includes(serviceType)) {
        filterState.setServiceTypeFilter(serviceType === 'any' ? '' : serviceType);
        filtersApplied = true;
      }
      
      if (searchParams.has('verified')) {
        filterState.setVerifiedOnly(verified);
        filtersApplied = true;
      }
      
      if (searchParams.has('available')) {
        filterState.setAvailableNow(available);
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
        const ratingValue = parseInt(rating, 10);
        if (!isNaN(ratingValue)) {
          filterState.setRatingMin(ratingValue);
          filtersApplied = true;
        }
      }
      
      // Only mark as complete after we've processed URL parameters
      setInitialLoadComplete(true);
    } finally {
      // Always reset the flag when done
      filterUpdateFromUrlRef.current = false;
    }
  }, [searchParams, filterState, initialLoadComplete]);
  
  // Update URL when filters change, but only after initial load is complete
  const updateUrlFromFilters = useCallback(() => {
    if (!initialLoadComplete || updatingUrlRef.current || filterUpdateFromUrlRef.current) return;
    
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
      } else {
        // If empty string, use 'any' in the URL
        params.set('serviceType', 'any');
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
      updatingUrlRef.current = false;
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
      // Use requestAnimationFrame instead of setTimeout to avoid timer-based state updates
      const animationId = requestAnimationFrame(() => {
        updateUrlFromFilters();
      });
      return () => cancelAnimationFrame(animationId);
    }
  }, [
    updateUrlFromFilters,
    initialLoadComplete
  ]);
  
  return filterState;
};

export default useEscortFilterWithUrl;
