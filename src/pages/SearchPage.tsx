
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterValues } from '@/components/search/AdvancedFilters';
import SearchHeader from '@/components/search/SearchHeader';
import AdvancedFilters from '@/components/search/AdvancedFilters';
import DisplayFilters from '@/components/search/DisplayFilters';
import SearchResults from '@/components/search/SearchResults';
import RecentSearches from '@/components/search/RecentSearches';
import { useSearchHistory } from '@/hooks/useSearchHistory';

// Using placeholder data for now
const placeholderEscorts = [
  { 
    id: '1', 
    name: 'Sophia', 
    location: 'Los Angeles',
    age: 25,
    rating: 4.8,
    tags: ['GFE', 'Massage', 'Dinner Date'],
    price: 300,
    avatar_url: '/avatars/sophia.jpg',
    verified: true
  },
  { 
    id: '2', 
    name: 'Emma', 
    location: 'New York',
    age: 28,
    rating: 4.6,
    tags: ['Fetish', 'Role Play', 'Couples'],
    price: 350,
    avatar_url: '/avatars/emma.jpg',
    verified: true
  },
  { 
    id: '3', 
    name: 'Isabella', 
    location: 'Miami',
    age: 23,
    rating: 4.9,
    tags: ['Parties', 'Travel', 'Overnight'],
    price: 400,
    avatar_url: '/avatars/isabella.jpg',
    verified: false
  },
];

const placeholderCreators = [
  { 
    id: '1', 
    name: 'Luna', 
    location: 'Las Vegas',
    age: 26,
    subscriptionPrice: 14.99,
    contentCount: 250,
    tags: ['Cosplay', 'Fitness', 'Dance'],
    avatar_url: '/avatars/luna.jpg',
    verified: true
  },
  { 
    id: '2', 
    name: 'Aria', 
    location: 'Chicago',
    age: 24,
    subscriptionPrice: 9.99,
    contentCount: 180,
    tags: ['ASMR', 'Lingerie', 'Behind the Scenes'],
    avatar_url: '/avatars/aria.jpg',
    verified: true
  },
];

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    recentSearches, 
    addSearch, 
    clearSearch, 
    clearAllSearches 
  } = useSearchHistory();
  
  // State management
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('escorts');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);
  
  // Filter states
  const [filters, setFilters] = useState<FilterValues>({
    location: '',
    minAge: 18,
    maxAge: 50,
    minPrice: 0,
    maxPrice: 1000,
    tags: []
  });
  
  // Parse URL params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const type = params.get('type');
    
    if (query) setSearchQuery(query);
    if (type && (type === 'escorts' || type === 'creators')) setSearchType(type);
  }, [location]);
  
  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Check if there are active filters
  const hasActiveFilters = () => {
    return (
      filters.location !== '' ||
      filters.minAge !== 18 ||
      filters.maxAge !== 50 ||
      filters.minPrice !== 0 ||
      filters.maxPrice !== 1000 ||
      filters.tags.length > 0
    );
  };
  
  // Reset filters to default
  const resetFilters = () => {
    setFilters({
      location: '',
      minAge: 18,
      maxAge: 50,
      minPrice: 0,
      maxPrice: 1000,
      tags: []
    });
  };
  
  // Handle search submit
  const handleSearch = () => {
    setIsLoading(true);
    
    // Update URL without reloading page
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    params.set('type', searchType);
    navigate(`/search?${params.toString()}`, { replace: true });
    
    // Add to search history
    if (searchQuery.trim()) {
      addSearch(searchQuery, searchType);
    }
    
    // Simulate API call
    setTimeout(() => {
      setResults(searchType === 'escorts' ? placeholderEscorts : placeholderCreators);
      setIsLoading(false);
    }, 500);
  };
  
  // Handle selecting a recent search
  const handleSelectRecentSearch = (search: any) => {
    setSearchQuery(search.query);
    setSearchType(search.type);
    
    // We could trigger the search immediately but let's wait for user to click search
    // handleSearch();
  };
  
  // Apply filters
  const applyFilters = () => {
    setShowAdvancedFilters(false);
    handleSearch();
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      
      <RecentSearches 
        searches={recentSearches}
        onSelect={handleSelectRecentSearch}
        onClear={clearSearch}
        onClearAll={clearAllSearches}
      />
      
      <SearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        onSearch={handleSearch}
      />
      
      <AdvancedFilters 
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        visible={showAdvancedFilters}
      />
      
      <DisplayFilters 
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters()}
      />
      
      <SearchResults 
        results={results}
        searchType={searchType}
        loading={isLoading}
      />
    </div>
  );
};

export default SearchPage;
