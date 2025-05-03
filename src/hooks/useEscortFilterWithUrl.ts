
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Escort } from "@/types/Escort";

interface UseEscortFilterProps {
  escorts: Escort[];
}

export const useEscortFilterWithUrl = ({ escorts }: UseEscortFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>(escorts);
  const [isLoading, setIsLoading] = useState(false);

  // Get filter values from URL params
  const initSearchQuery = searchParams.get("search") || "";
  const initLocation = searchParams.get("location") || "";
  const initVerifiedOnly = searchParams.get("verified") === "true";
  const initAvailableNow = searchParams.get("available") === "true";
  const initServiceTypeFilter = searchParams.get("serviceType") as "in-person" | "virtual" | "both" | "";
  const initRatingMin = Number(searchParams.get("rating")) || 0;
  const initSelectedServices = searchParams.get("services")?.split(",") || [];
  const initSelectedGenders = searchParams.get("genders")?.split(",") || [];
  const initSortBy = searchParams.get("sort") || "newest";
  const initPage = Number(searchParams.get("page")) || 1;

  // Filter states
  const [searchQuery, setSearchQuery] = useState(initSearchQuery);
  const [location, setLocation] = useState(initLocation);
  const [verifiedOnly, setVerifiedOnly] = useState(initVerifiedOnly);
  const [availableNow, setAvailableNow] = useState(initAvailableNow);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<"in-person" | "virtual" | "both" | "">(
    initServiceTypeFilter || ""
  );
  const [ratingMin, setRatingMin] = useState(initRatingMin);
  const [selectedServices, setSelectedServices] = useState<string[]>(initSelectedServices);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(initSelectedGenders);
  const [sortBy, setSortBy] = useState(initSortBy);
  const [currentPage, setCurrentPage] = useState(initPage);
  const [totalPages, setTotalPages] = useState(1);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set("search", searchQuery);
    if (location) params.set("location", location);
    if (verifiedOnly) params.set("verified", "true");
    if (availableNow) params.set("available", "true");
    if (serviceTypeFilter) params.set("serviceType", serviceTypeFilter);
    if (ratingMin > 0) params.set("rating", ratingMin.toString());
    if (selectedServices.length > 0) params.set("services", selectedServices.join(","));
    if (selectedGenders.length > 0) params.set("genders", selectedGenders.join(","));
    if (sortBy !== "newest") params.set("sort", sortBy);
    if (currentPage > 1) params.set("page", currentPage.toString());
    
    setSearchParams(params);
  }, [
    searchQuery, location, verifiedOnly, availableNow, serviceTypeFilter,
    ratingMin, selectedServices, selectedGenders, sortBy, currentPage, setSearchParams
  ]);

  // Apply filters to escorts
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay for UI feedback
    const timer = setTimeout(() => {
      let result = [...escorts];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(escort => 
          escort.name?.toLowerCase().includes(query) || 
          escort.location?.toLowerCase().includes(query) ||
          escort.bio?.toLowerCase().includes(query)
        );
      }
      
      // Apply location filter
      if (location) {
        result = result.filter(escort => 
          escort.location?.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Apply verified filter
      if (verifiedOnly) {
        result = result.filter(escort => 
          escort.isVerified === true || escort.verified === true
        );
      }
      
      // Apply availability filter
      if (availableNow) {
        result = result.filter(escort => 
          escort.availableNow === true
        );
      }
      
      // Apply service type filter
      if (serviceTypeFilter) {
        if (serviceTypeFilter === "in-person") {
          result = result.filter(escort => 
            escort.providesInPersonServices === true || 
            escort.serviceType === "in-person" ||
            escort.services?.includes("in-person")
          );
        } else if (serviceTypeFilter === "virtual") {
          result = result.filter(escort => 
            escort.providesVirtualContent === true || 
            escort.serviceType === "virtual" ||
            escort.services?.includes("virtual")
          );
        } else if (serviceTypeFilter === "both") {
          result = result.filter(escort => 
            (escort.providesInPersonServices === true && escort.providesVirtualContent === true) ||
            escort.serviceType === "both" ||
            (escort.services?.includes("in-person") && escort.services?.includes("virtual"))
          );
        }
      }
      
      // Apply rating filter
      if (ratingMin > 0) {
        result = result.filter(escort => 
          (escort.rating ?? 0) >= ratingMin
        );
      }
      
      // Apply services filter
      if (selectedServices.length > 0) {
        result = result.filter(escort => 
          selectedServices.some(service => escort.services?.includes(service))
        );
      }
      
      // Apply gender filter
      if (selectedGenders.length > 0) {
        result = result.filter(escort => 
          selectedGenders.includes(escort.gender ?? "")
        );
      }
      
      // Apply sorting
      if (sortBy === "rating") {
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      } else if (sortBy === "price-low") {
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      } else if (sortBy === "price-high") {
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      } else if (sortBy === "reviews") {
        result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
      } else if (sortBy === "featured") {
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }
      
      // Calculate total pages (10 escorts per page)
      setTotalPages(Math.max(1, Math.ceil(result.length / 10)));
      
      // Apply pagination
      const pageSize = 10;
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedResults = result.slice(startIndex, startIndex + pageSize);
      
      setFilteredEscorts(paginatedResults);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [
    escorts, searchQuery, location, verifiedOnly, availableNow,
    serviceTypeFilter, ratingMin, selectedServices, selectedGenders, sortBy, currentPage
  ]);

  // Utility function to toggle a service
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  // Utility function to toggle a gender
  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender)
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    );
  };

  // Reset all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setVerifiedOnly(false);
    setAvailableNow(false);
    setServiceTypeFilter("");
    setRatingMin(0);
    setSelectedServices([]);
    setSelectedGenders([]);
    setSortBy("newest");
    setCurrentPage(1);
  };

  return {
    filteredEscorts,
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    verifiedOnly,
    setVerifiedOnly,
    availableNow,
    setAvailableNow,
    serviceTypeFilter,
    setServiceTypeFilter,
    ratingMin,
    setRatingMin,
    selectedServices,
    setSelectedServices,
    toggleService,
    selectedGenders,
    setSelectedGenders,
    toggleGender,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    clearFilters
  };
};
