
import { useState, useEffect } from "react";
import { Escort } from "@/types/escort";
import { useNotifications } from "@/contexts/NotificationsContext";

export const useEscortDetail = (escortId: string | undefined) => {
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showError } = useNotifications();

  useEffect(() => {
    const fetchEscortDetail = async () => {
      if (!escortId) {
        setError("Escort ID is required");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call like:
        // const response = await fetch(`/api/escorts/${escortId}`);
        // const data = await response.json();
        
        // For now, we'll simulate an API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in real app this would come from API
        // Simulating data from local storage (could be from imported mock data too)
        const localEscorts = localStorage.getItem("mockEscorts");
        const allEscorts = localEscorts ? JSON.parse(localEscorts) : [];
        const foundEscort = allEscorts.find((e: Escort) => e.id === escortId);
        
        if (foundEscort) {
          setEscort(foundEscort);
        } else {
          setError("Escort not found");
          if (showError) showError("Not Found", "The escort profile you're looking for doesn't exist or has been removed");
        }
      } catch (err) {
        console.error("Error fetching escort details:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch escort details";
        setError(errorMessage);
        if (showError) {
          showError("Error Loading Profile", errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscortDetail();
  }, [escortId, showError]);
  
  return { escort, loading, error };
};
