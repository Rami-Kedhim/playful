
import { useState, useEffect, useMemo, useRef } from 'react';
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
    
    // Apply all filters asynchronously to avoid render cycles
    const applyFilters = () => {
      // Only apply filters that actually exist in the URL
      if (serviceType && ['in-person', 'virtual', 'both'].includes(serviceType)) {
        filterState.setServiceTypeFilter(serviceType);
      }
      
      if (verified) {
        filterState.setVerifiedOnly(true);
      }
      
      if (available) {
        filterState.setAvailableNow(true);
      }
      
      if (location) {
        filterState.setLocation(location);
      }
      
      if (query) {
        filterState.setSearchQuery(query);
      }
      
      if (rating) {
        filterState.setRatingMin(parseInt(rating, 10));
      }
      
      // Mark initial load as complete to prevent further URL->state syncs
      setInitialLoadComplete(true);
    };
    
    // Use setTimeout to break the potential render cycle
    const timeoutId = setTimeout(applyFilters, 0);
    return () => clearTimeout(timeoutId);
  }, [searchParams, filterState]);
  
  // Update URL when filters change, but only after initial load is complete
  useEffect(() => {
    // Skip URL updates during initial load to prevent loops
    if (!initialLoadComplete || updatingUrlRef.current) return;
    
    updatingUrlRef.current = true;
    
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
    
    // Safely update URL parameters
    const timeoutId = setTimeout(() => {
      // Compare current and new params to avoid unnecessary history entries
      const currentParamsString = searchParams.toString();
      const newParamsString = params.toString();
      
      if (currentParamsString !== newParamsString) {
        // Use { replace: true } to avoid adding to browser history
        setSearchParams(params, { replace: true });
      }
      
      updatingUrlRef.current = false;
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      updatingUrlRef.current = false;
    };
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
  
  return filterState;
};

export default useEscortFilterWithUrl;
