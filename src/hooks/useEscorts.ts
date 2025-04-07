
import { useState, useEffect } from "react";
import { Escort } from "@/types/escort";

interface UseEscortsOptions {
  initialData?: Escort[];
  filters?: {
    location?: string;
    services?: string[];
    minPrice?: number;
    maxPrice?: number;
    gender?: string;
  };
}

export const useEscorts = ({ initialData = [], filters = {} }: UseEscortsOptions = {}) => {
  const [escorts, setEscorts] = useState<Escort[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEscorts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call with filters
      // For now, we'll just simulate a delay and return the initial data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Apply any filters if needed
      let filteredData = [...initialData];
      
      // Return the data
      setEscorts(filteredData);
    } catch (err) {
      console.error("Error fetching escorts:", err);
      setError("Failed to load escort profiles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    if (initialData.length === 0) {
      fetchEscorts();
    }
  }, []);

  return {
    escorts,
    loading,
    error,
    fetchEscorts
  };
};

export default useEscorts;
