
import { useState } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

export const useEscortFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [gender, setGender] = useState<string[]>([]);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>('');
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedEthnicities, setSelectedEthnicities] = useState<string[]>([]);
  const [selectedHairColors, setSelectedHairColors] = useState<string[]>([]);
  const [selectedEyeColors, setSelectedEyeColors] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [heightRange, setHeightRange] = useState<[number, number]>([150, 200]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableNow, setAvailableNow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use empty string as a representation of "any" type filter
  const effectiveServiceTypeFilter = serviceTypeFilter === 'any' ? '' : serviceTypeFilter;

  const resetFilters = () => {
    setSearchQuery('');
    setLocation('');
    setPriceRange([0, 1000]);
    setAgeRange([18, 60]);
    setGender([]);
    setServiceTypeFilter('');
    setSelectedBodyTypes([]);
    setSelectedEthnicities([]);
    setSelectedHairColors([]);
    setSelectedEyeColors([]);
    setSelectedOrientations([]);
    setSelectedServices([]);
    setHeightRange([150, 200]);
    setVerifiedOnly(false);
    setAvailableNow(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    setPriceRange,
    ageRange,
    setAgeRange,
    gender,
    setGender,
    serviceTypeFilter,
    setServiceTypeFilter,
    selectedBodyTypes,
    setSelectedBodyTypes,
    selectedEthnicities,
    setSelectedEthnicities,
    selectedHairColors,
    setSelectedHairColors,
    selectedEyeColors,
    setSelectedEyeColors,
    selectedOrientations,
    setSelectedOrientations,
    selectedServices,
    setSelectedServices,
    heightRange,
    setHeightRange,
    verifiedOnly,
    setVerifiedOnly,
    availableNow,
    setAvailableNow,
    isLoading,
    setIsLoading,
    resetFilters
  };
};
