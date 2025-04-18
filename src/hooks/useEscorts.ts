import { useState, useEffect, useCallback } from 'react';
import { Escort } from '@/types/escort';
import { EscortFilterOptions } from '@/types/escortFilters';

interface UseEscortsProps {
  initialFilters?: Partial<EscortFilterOptions>;
}

export const useEscorts = ({ initialFilters = {} }: UseEscortsProps = {}) => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>([]);
  const [featuredEscorts, setFeaturedEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EscortFilterOptions>({
    gender: [],
    service: [],
    serviceType: [],
    serviceTypes: [],
    priceRange: [0, 1000],
    ageRange: [18, 65],
    languages: [],
    location: '',
    maxDistance: 50,
    availability: [],
    rating: 0,
    verified: false,
    orientation: [],
    availableNow: false,
    ...initialFilters
  });

  // Fetch escorts data
  const fetchEscorts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // For now just use a placeholder mock data
      const mockEscorts: Escort[] = Array(20).fill(0).map((_, i) => ({
        id: `escort-${i}`,
        name: `Escort ${i}`,
        age: 20 + (i % 15),
        location: 'New York',
        gender: i % 3 === 0 ? 'male' : 'female',
        bio: 'Professional escort offering companionship services.',
        price: 150 + (i * 10),
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 50),
        services: ['Dinner Date', 'Events', 'Travel Companion'],
        images: [`https://picsum.photos/300/400?random=${i}`],
        isVerified: i % 2 === 0,
        featured: i % 10 === 0,
        contactInfo: {
          email: 'contact@example.com',
          phone: '+1234567890'
        }
      }));

      setEscorts(mockEscorts);
      const featured = mockEscorts.filter(escort => escort.featured);
      setFeaturedEscorts(featured);
      applyFilters(mockEscorts, filters);
    } catch (err) {
      setError('Failed to fetch escort data');
      console.error('Error fetching escorts:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Apply filters to the escorts data
  const applyFilters = useCallback((escortList: Escort[], currentFilters: EscortFilterOptions) => {
    let filtered = [...escortList];

    // Gender filter
    if (currentFilters.gender.length > 0) {
      filtered = filtered.filter(escort => 
        currentFilters.gender.includes(escort.gender.toLowerCase())
      );
    }

    // Service filter
    if (currentFilters.service.length > 0) {
      filtered = filtered.filter(escort => 
        escort.services.some(service => 
          currentFilters.service.includes(service.toLowerCase())
        )
      );
    }

    // Price range filter
    filtered = filtered.filter(escort => 
      escort.price >= currentFilters.priceRange[0] && 
      escort.price <= currentFilters.priceRange[1]
    );

    // Age range filter
    filtered = filtered.filter(escort => 
      escort.age >= currentFilters.ageRange[0] && 
      escort.age <= currentFilters.ageRange[1]
    );

    // Verification filter
    if (currentFilters.verified) {
      filtered = filtered.filter(escort => escort.isVerified);
    }

    // Location filter
    if (currentFilters.location) {
      filtered = filtered.filter(escort => 
        escort.location.toLowerCase().includes(currentFilters.location.toLowerCase())
      );
    }

    // Rating filter
    if (currentFilters.rating > 0) {
      filtered = filtered.filter(escort => 
        (escort.rating || 0) >= currentFilters.rating
      );
    }
    
    // Available now filter
    if (currentFilters.availableNow) {
      filtered = filtered.filter(escort => 
        escort.availableNow === true
      );
    }
    
    // Service type filter (in-person, virtual, both)
    if (currentFilters.serviceTypes && currentFilters.serviceTypes.length > 0) {
      filtered = filtered.filter(escort => {
        // If escort has explicit serviceTypes property, use that
        if (escort.serviceTypes && escort.serviceTypes.length > 0) {
          return currentFilters.serviceTypes?.some(type => escort.serviceTypes?.includes(type));
        }
        
        // Otherwise infer from providesInPerson/Virtual
        if (currentFilters.serviceTypes?.includes('in-person') && escort.providesInPersonServices) {
          return true;
        }
        if (currentFilters.serviceTypes?.includes('virtual') && escort.providesVirtualContent) {
          return true;
        }
        if (currentFilters.serviceTypes?.includes('both') && 
            escort.providesInPersonServices && escort.providesVirtualContent) {
          return true;
        }
        
        return false;
      });
    }

    setFilteredEscorts(filtered);
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<EscortFilterOptions>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      applyFilters(escorts, updated);
      return updated;
    });
  }, [escorts, applyFilters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      gender: [],
      service: [],
      serviceType: [],
      serviceTypes: [],
      priceRange: [0, 1000],
      ageRange: [18, 65],
      languages: [],
      location: '',
      maxDistance: 50,
      availability: [],
      rating: 0,
      verified: false,
      orientation: [],
      availableNow: false
    });
    setFilteredEscorts(escorts);
  }, [escorts]);
  
  // Apply current filters (used for initial load)
  const applyCurrentFilters = useCallback(() => {
    applyFilters(escorts, filters);
  }, [escorts, filters, applyFilters]);
  
  // Alias for clearFilters to match interface in Escorts.tsx
  const clearAllFilters = clearFilters;

  // Load escorts initially
  useEffect(() => {
    fetchEscorts();
  }, [fetchEscorts]);

  return {
    escorts: filteredEscorts,
    allEscorts: escorts,
    featuredEscorts,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    clearAllFilters,
    applyCurrentFilters,
    refetch: fetchEscorts
  };
};

export default useEscorts;
