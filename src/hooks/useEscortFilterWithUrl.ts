
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEscortFilter } from '@/hooks/useEscortFilter';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { Escort } from '@/types/Escort';

interface UseEscortFilterWithUrlProps {
  escorts: Escort[];
}

export const useEscortFilterWithUrl = ({ escorts }: UseEscortFilterWithUrlProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialLoad, setInitialLoad] = useState(true);
  const filterState = useEscortFilter({ escorts });
  
  // Load filters from URL on mount only once
  useEffect(() => {
    if (!initialLoad) return;
    
    // Get filter values from URL parameters
    const serviceType = searchParams.get('serviceType') as ServiceTypeFilter;
    const verified = searchParams.get('verified') === 'true';
    const available = searchParams.get('available') === 'true';
    const location = searchParams.get('location') || '';
    const query = searchParams.get('q') || '';
    const rating = searchParams.get('rating');
    
    // Create a batch of updates to apply at once
    const updates = {};
    let hasUpdates = false;
    
    // Update filter state based on URL parameters
    if (serviceType && ['in-person', 'virtual', 'both'].includes(serviceType)) {
      updates['serviceTypeFilter'] = serviceType;
      hasUpdates = true;
    }
    
    if (verified) {
      updates['verifiedOnly'] = true;
      hasUpdates = true;
    }
    
    if (available) {
      updates['availableNow'] = true;
      hasUpdates = true;
    }
    
    if (location) {
      updates['location'] = location;
      hasUpdates = true;
    }
    
    if (query) {
      updates['searchQuery'] = query;
      hasUpdates = true;
    }
    
    if (rating) {
      updates['ratingMin'] = parseInt(rating, 10);
      hasUpdates = true;
    }
    
    // Apply all updates at once to minimize renders
    if (hasUpdates) {
      setTimeout(() => {
        // Use setTimeout to ensure these are applied outside the current render cycle
        if (updates['serviceTypeFilter']) filterState.setServiceTypeFilter(updates['serviceTypeFilter']);
        if (updates['verifiedOnly']) filterState.setVerifiedOnly(true);
        if (updates['availableNow']) filterState.setAvailableNow(true);
        if (updates['location']) filterState.setLocation(updates['location']);
        if (updates['searchQuery']) filterState.setSearchQuery(updates['searchQuery']);
        if (updates['ratingMin']) filterState.setRatingMin(updates['ratingMin']);
        
        // Mark initial load as complete to prevent further URL->state syncs
        setInitialLoad(false);
      }, 0);
    } else {
      // If no updates needed, still mark initial load complete
      setInitialLoad(false);
    }
  }, [searchParams, filterState]);
  
  // Update URL when filters change, but only after initial load is complete
  useEffect(() => {
    // Skip URL updates during initial load to prevent loops
    if (initialLoad) return;
    
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
  }, [
    filterState.serviceTypeFilter,
    filterState.verifiedOnly,
    filterState.availableNow,
    filterState.location,
    filterState.searchQuery,
    filterState.ratingMin,
    setSearchParams,
    initialLoad,
    searchParams
  ]);
  
  return filterState;
};

export default useEscortFilterWithUrl;
