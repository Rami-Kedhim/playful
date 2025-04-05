
import { useState, useEffect, useCallback } from "react";
import { Escort } from "@/types/escort";
import { useNotifications } from "@/contexts/NotificationsContext";

interface UseEscortsProps {
  initialData?: Escort[];
}

export const useEscorts = ({ initialData = [] }: UseEscortsProps = {}) => {
  const [escorts, setEscorts] = useState<Escort[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showError } = useNotifications();
  
  // For demonstration, we'll fetch from a mock API
  // In a real app, this would connect to your backend API
  const fetchEscorts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, you'd fetch from an API endpoint
      // const response = await fetch('/api/escorts');
      // const data = await response.json();
      
      // For now, we'll simulate API delay and use the initialData
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (initialData.length > 0) {
        setEscorts(initialData);
      } else {
        // Fallback to some mock data if none provided
        console.log("No initial data provided, would fetch from API in production");
        // Set to empty array for now - in real app would fetch from API
        setEscorts([]);
      }
    } catch (err) {
      console.error("Error fetching escorts:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch escorts";
      setError(errorMessage);
      if (showError) {
        showError("Data Loading Error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [initialData, showError]);
  
  useEffect(() => {
    fetchEscorts();
  }, [fetchEscorts]);
  
  return {
    escorts,
    loading,
    error,
    fetchEscorts,
    setEscorts
  };
};
