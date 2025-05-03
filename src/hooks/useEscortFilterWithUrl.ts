
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
  const filterState = useEscortFilter({ escorts });
  
  // Load filters from URL on mount
  useEffect(() => {
    // Get filter values from URL parameters
    const serviceType = searchParams.get('serviceType') as ServiceTypeFilter;
    const verified = searchParams.get('verified') === 'true';
    const available = searchParams.get('available') === 'true';
    const location = searchParams.get('location') || '';
    const query = searchParams.get('q') || '';
    const rating = searchParams.get('rating');
    
    // Update filter state based on URL parameters
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
    
  }, [searchParams, filterState]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
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
    
    setSearchParams(params, { replace: true });
  }, [
    filterState.serviceTypeFilter,
    filterState.verifiedOnly,
    filterState.availableNow,
    filterState.location,
    filterState.searchQuery,
    filterState.ratingMin,
    setSearchParams
  ]);
  
  return filterState;
};

export default useEscortFilterWithUrl;
