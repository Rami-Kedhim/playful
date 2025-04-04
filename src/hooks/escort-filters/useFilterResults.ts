
import { useState, useEffect } from "react";
import { Escort } from "@/types/escort";

interface FilterState {
  searchQuery: string;
  location: string;
  priceRange: [number, number];
  verifiedOnly: boolean;
  selectedServices: string[];
  sortBy: string;
  selectedGenders: string[];
  selectedOrientations: string[];
  ageRange: [number, number];
  ratingMin: number;
  availableNow: boolean;
  serviceTypeFilter: string;
  currentPage: number;
}

export const useFilterResults = (
  escorts: Escort[],
  filters: FilterState,
  currentPage: number,
  setCurrentPage: (page: number) => void
) => {
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>([]);
  const [sortedEscorts, setSortedEscorts] = useState<Escort[]>([]); 
  const [paginatedEscorts, setPaginatedEscorts] = useState<Escort[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const pageSize = 12;
  
  // Apply filters to escorts
  useEffect(() => {
    // Set filtering state to true when filter operation starts
    setIsFiltering(true);
    
    // Use timeout to avoid blocking the UI during filtering
    const filterTimeout = setTimeout(() => {
      const {
        searchQuery,
        location,
        priceRange,
        verifiedOnly,
        selectedServices,
        selectedGenders,
        selectedOrientations,
        ageRange,
        ratingMin,
        availableNow,
        serviceTypeFilter
      } = filters;
      
      let filtered = [...escorts];
      
      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(escort => 
          escort.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          escort.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          escort.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by location
      if (location) {
        filtered = filtered.filter(escort => 
          escort.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Filter by price range
      filtered = filtered.filter(escort => 
        escort.price && escort.price >= priceRange[0] && escort.price <= priceRange[1]
      );
      
      // Filter by verified
      if (verifiedOnly) {
        filtered = filtered.filter(escort => escort.verified);
      }
      
      // Filter by services
      if (selectedServices.length > 0) {
        filtered = filtered.filter(escort => 
          escort.services && selectedServices.some(service => escort.services?.includes(service))
        );
      }
      
      // Filter by gender
      if (selectedGenders.length > 0) {
        filtered = filtered.filter(escort => 
          escort.gender && selectedGenders.includes(escort.gender)
        );
      }
      
      // Filter by orientation
      if (selectedOrientations.length > 0) {
        filtered = filtered.filter(escort => 
          escort.sexualOrientation && selectedOrientations.includes(escort.sexualOrientation)
        );
      }
      
      // Filter by age range (now 21+ years)
      filtered = filtered.filter(escort => 
        escort.age >= ageRange[0] && escort.age <= ageRange[1]
      );
      
      // Filter by minimum rating
      filtered = filtered.filter(escort => 
        escort.rating >= ratingMin
      );
      
      // Filter by availability now
      if (availableNow) {
        filtered = filtered.filter(escort => 
          escort.availableNow === true
        );
      }
      
      // Filter by service type
      if (serviceTypeFilter === 'in-person') {
        filtered = filtered.filter(escort => 
          escort.serviceTypes?.includes('in-person') || 
          escort.serviceTypes?.includes('both') ||
          escort.providesInPersonServices === true
        );
      } else if (serviceTypeFilter === 'virtual') {
        filtered = filtered.filter(escort => 
          escort.serviceTypes?.includes('virtual') || 
          escort.serviceTypes?.includes('both') || 
          escort.providesVirtualContent === true
        );
      } else if (serviceTypeFilter === 'both') {
        filtered = filtered.filter(escort => 
          (escort.serviceTypes?.includes('in-person') || escort.providesInPersonServices === true) && 
          (escort.serviceTypes?.includes('virtual') || escort.providesVirtualContent === true)
        );
      }
      
      // Apply sorting
      let sorted = [...filtered];
      
      switch (filters.sortBy) {
        case 'price-asc':
          sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case 'price-desc':
          sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case 'rating':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          // Default sorting (newest/featured)
          sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }
      
      setFilteredEscorts(filtered);
      setSortedEscorts(sorted);
      setTotalPages(Math.ceil(filtered.length / pageSize));
      
      // Reset to first page when filters change
      setCurrentPage(1);
      
      // Set filtering state to false when filter operation completes
      setIsFiltering(false);
    }, 300); // Small delay to show loading state
    
    return () => clearTimeout(filterTimeout);
  }, [escorts, filters, setCurrentPage]);
  
  // Apply pagination
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setPaginatedEscorts(sortedEscorts.slice(start, end));
  }, [sortedEscorts, currentPage]);
  
  return {
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages,
    isFiltering
  };
};
