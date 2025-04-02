
import { useMemo, useState } from "react";
import { Escort } from "@/data/escortData";

export const ESCORTS_PER_PAGE = 6; // Number of escorts to display per page

export interface EscortFilterState {
  searchQuery: string;
  location: string;
  priceRange: number[];
  verifiedOnly: boolean;
  selectedServices: string[];
  sortBy: string;
  currentPage: number;
}

interface UseEscortFilterResult extends EscortFilterState {
  setSearchQuery: (value: string) => void;
  setLocation: (value: string) => void;
  setPriceRange: (value: number[]) => void;
  setVerifiedOnly: (value: boolean) => void;
  toggleService: (service: string) => void;
  setSortBy: (value: string) => void;
  setCurrentPage: (value: number) => void;
  clearFilters: () => void;
  filteredEscorts: Escort[];
  paginatedEscorts: Escort[];
  totalPages: number;
}

export function useEscortFilter(escortData: Escort[]): UseEscortFilterResult {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 500]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSortBy("featured");
    setCurrentPage(1);
  };
  
  // Filter and sort escorts
  const filteredEscorts = useMemo(() => {
    // Filter logic
    let result = escortData.filter(escort => {
      const matchesSearch = escort.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = location ? escort.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesPrice = escort.price >= priceRange[0] && escort.price <= priceRange[1];
      const matchesVerified = verifiedOnly ? escort.verified : true;
      const matchesServices = selectedServices.length > 0 
        ? selectedServices.some(service => escort.tags.includes(service))
        : true;
        
      return matchesSearch && matchesLocation && matchesPrice && matchesVerified && matchesServices;
    });

    // Sort logic
    switch (sortBy) {
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "reviews":
        return [...result].sort((a, b) => b.reviews - a.reviews);
      case "featured":
      default:
        // Assuming featured is already in the desired order
        return result;
    }
  }, [escortData, searchQuery, location, priceRange, verifiedOnly, selectedServices, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEscorts.length / ESCORTS_PER_PAGE);
  
  const paginatedEscorts = useMemo(() => {
    const startIndex = (currentPage - 1) * ESCORTS_PER_PAGE;
    return filteredEscorts.slice(startIndex, startIndex + ESCORTS_PER_PAGE);
  }, [filteredEscorts, currentPage]);

  return {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    setPriceRange,
    verifiedOnly,
    setVerifiedOnly,
    selectedServices,
    toggleService,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    clearFilters,
    filteredEscorts,
    paginatedEscorts,
    totalPages
  };
}
