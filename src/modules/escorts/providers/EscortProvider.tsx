import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Escort, EscortFilterOptions, ServiceType } from '@/types/escort';
import { fetchEscorts } from '../../../services/escortService';

interface EscortContextProps {
  escorts: Escort[];
  loading: boolean;
  error: string | null;
  filters: EscortFilterOptions;
  setFilters: (filters: EscortFilterOptions) => void;
  filteredEscorts: Escort[];
  fetchEscorts: () => Promise<void>;
}

const EscortContext = createContext<EscortContextProps | undefined>(undefined);

interface EscortProviderProps {
  children: ReactNode;
}

export const EscortProvider: React.FC<EscortProviderProps> = ({ children }) => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EscortFilterOptions>({});
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>([]);

  const fetchEscortsData = async () => {
    setLoading(true);
    try {
      const data = await fetchEscorts();
      setEscorts(data);
      setFilteredEscorts(data);
    } catch (err: any) {
      setError(err.message || 'Could not fetch escorts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscortsData();
  }, []);

  useEffect(() => {
    // Apply filters whenever escorts or filters change
    const applyFilters = () => {
      let results = [...escorts];

      if (filters.age && filters.age.length === 2) {
        results = results.filter(escort => escort.age >= filters.age![0] && escort.age <= filters.age![1]);
      }

      if (filters.gender && filters.gender.length > 0) {
        results = results.filter(escort => filters.gender!.includes(escort.gender));
      }

      if (filters.location) {
        results = results.filter(escort => escort.location.toLowerCase().includes(filters.location!.toLowerCase()));
      }

      if (filters.services && filters.services.length > 0) {
        results = results.filter(escort => filters.services!.every(service => escort.services.includes(service)));
      }

      if (filters.priceRange && filters.priceRange.length === 2) {
        const [min, max] = filters.priceRange;
        results = results.filter(escort => {
          const hourlyRate = parseInt(escort.hourly_rate.replace('$', ''), 10);
          return hourlyRate >= min && hourlyRate <= max;
        });
      }

      if (filters.availability && filters.availability.length > 0) {
        results = results.filter(escort =>
          filters.availability!.every(day =>
            Array.isArray(escort.availability) ?
              escort.availability.some(avail => avail.day.toLowerCase() === day.toLowerCase() && avail.available) :
              (escort.availability as any).day.toLowerCase() === day.toLowerCase() && (escort.availability as any).available
          )
        );
      }

      if (filters.languages && filters.languages.length > 0) {
        results = results.filter(escort => filters.languages!.every(language => escort.languages.includes(language)));
      }

      if (filters.bodyType && filters.bodyType.length > 0) {
        results = results.filter(escort => filters.bodyType!.includes(escort.body_type));
      }

      if (filters.ethnicities && filters.ethnicities.length > 0) {
        results = results.filter(escort => filters.ethnicities!.includes(escort.ethnicity));
      }

      if (filters.serviceTypes && filters.serviceTypes.length > 0) {
        results = results.filter(escort => {
          if (filters.serviceTypes!.includes(ServiceType.BOTH)) {
            return true;
          }
          const hasInPerson = filters.serviceTypes!.includes(ServiceType.IN_PERSON) && escort.providesInPersonServices;
          const hasVirtual = filters.serviceTypes!.includes(ServiceType.VIRTUAL) && escort.providesVirtualContent;
          return hasInPerson || hasVirtual;
        });
      }

      setFilteredEscorts(results);
    };

    applyFilters();
  }, [escorts, filters]);

  const value: EscortContextProps = {
    escorts,
    loading,
    error,
    filters,
    setFilters,
    filteredEscorts,
    fetchEscorts: fetchEscortsData,
  };

  return (
    <EscortContext.Provider value={value}>
      {children}
    </EscortContext.Provider>
  );
};

export const useEscortContext = () => {
  const context = useContext(EscortContext);
  if (!context) {
    throw new Error('useEscortContext must be used within a EscortProvider');
  }
  return context;
};
