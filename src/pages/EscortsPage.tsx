
import { useState, useEffect, useCallback, useMemo } from "react";
import { UnifiedLayout } from "@/components/layout";
import EscortScraper from "@/services/scrapers/EscortScraper";
import { Escort } from "@/types/Escort";
import EscortContainer from "@/components/escorts/EscortContainer";

const EscortsPage = () => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize service options to prevent re-renders
  const services = useMemo(() => [
    "Dinner Date",
    "Travel Companion",
    "Event Companion",
    "Massage",
    "In-Person Meeting",
    "Virtual Meeting",
    "Overnight",
    "Weekend",
  ], []);

  // Use useCallback to prevent recreation on every render
  const fetchEscorts = useCallback(async () => {
    setIsLoading(true);
    try {
      const scraper = EscortScraper.getInstance();
      const fetchedEscorts = await scraper.getEscorts();
      
      // Add some additional demo data for filtering capabilities
      const enhancedEscorts = fetchedEscorts.map(escort => ({
        ...escort,
        availableNow: Math.random() > 0.5,
        providesInPersonServices: Math.random() > 0.3,
        providesVirtualContent: Math.random() > 0.4,
        serviceType: Math.random() > 0.6 ? "both" : Math.random() > 0.5 ? "in-person" : "virtual",
        lastActive: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        responseRate: Math.floor(Math.random() * 50) + 50,
      }));
      
      setEscorts(enhancedEscorts);
      setError(null);
    } catch (err) {
      console.error("Error fetching escorts:", err);
      setError("Failed to load escort data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEscorts();
  }, [fetchEscorts]);

  return (
    <UnifiedLayout 
      title="Find Your Perfect Escort" 
      description="Browse our selection of verified escorts"
      showBreadcrumbs
    >
      <div className="container mx-auto px-4">
        <EscortContainer 
          escorts={escorts} 
          services={services} 
          isLoading={isLoading} 
        />
      </div>
    </UnifiedLayout>
  );
};

export default EscortsPage;
