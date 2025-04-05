
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import EscortContainer from "@/components/escorts/EscortContainer";
import { useEscorts } from "@/hooks/useEscorts";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { escorts as mockEscorts, availableServices } from "@/data/escortData";

const Escorts: React.FC = () => {
  const { escorts, loading, error, fetchEscorts } = useEscorts({ initialData: mockEscorts });
  const { showInfo } = useNotifications();
  const [showFilters, setShowFilters] = useState(false);

  const handleRefresh = () => {
    fetchEscorts();
    if (showInfo) showInfo("Refreshing Data", "Getting the latest escort profiles");
  };
  
  return (
    <>
      <Helmet>
        <title>Premium Escort Directory | Find Verified Escorts</title>
        <meta name="description" content="Browse our premium directory of verified escort services. Find the perfect companion with advanced filtering options." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Escort Directory</h1>
            <Button onClick={handleRefresh} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
          
          {error ? (
            <div className="p-4 bg-red-500/10 border border-red-500 rounded-md text-center mb-6">
              <p className="text-red-500">Error: {error}</p>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <EscortContainer 
              escorts={escorts}
              services={availableServices}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Escorts;
