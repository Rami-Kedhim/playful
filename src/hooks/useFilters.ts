
import { useState } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    services: {
      massage: false,
      companionship: false,
      dating: false,
      travel: false,
      dinner: false,
    },
    gender: {
      female: false,
      male: false,
      transgender: false,
      nonbinary: false,
    },
    verified: false,
    availableNow: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      services: {
        massage: false,
        companionship: false,
        dating: false,
        travel: false,
        dinner: false,
      },
      gender: {
        female: false,
        male: false,
        transgender: false,
        nonbinary: false,
      },
      verified: false,
      availableNow: false,
    });
    setAppliedFilters({
      priceRange: [0, 1000],
      services: {
        massage: false,
        companionship: false,
        dating: false,
        travel: false,
        dinner: false,
      },
      gender: {
        female: false,
        male: false,
        transgender: false,
        nonbinary: false,
      },
      verified: false,
      availableNow: false,
    });
  };

  const filterEscorts = (escorts: any[]) => {
    return escorts.filter(escort => {
      // Price filter
      if (
        escort.price < appliedFilters.priceRange[0] ||
        escort.price > appliedFilters.priceRange[1]
      ) {
        return false;
      }

      // Service filter
      const activeServices = Object.keys(appliedFilters.services).filter(
        service => appliedFilters.services[service]
      );
      if (
        activeServices.length > 0 &&
        (!escort.services ||
          !activeServices.some(service => escort.services.includes(service)))
      ) {
        return false;
      }

      // Gender filter
      const activeGenders = Object.keys(appliedFilters.gender).filter(
        gender => appliedFilters.gender[gender]
      );
      if (
        activeGenders.length > 0 &&
        (!escort.gender || !activeGenders.includes(escort.gender.toLowerCase()))
      ) {
        return false;
      }

      // Verified filter
      if (
        appliedFilters.verified &&
        (!escort.verified && !escort.isVerified)
      ) {
        return false;
      }

      // Available now filter
      if (
        appliedFilters.availableNow &&
        (!escort.availableNow && !escort.isAvailable)
      ) {
        return false;
      }

      // If it passes all filters
      return true;
    });
  };

  return {
    filters,
    setFilters,
    appliedFilters,
    applyFilters,
    clearFilters,
    filterEscorts,
  };
};
