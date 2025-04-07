
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useEscorts } from "@/hooks/useEscorts";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { escorts as mockEscorts, availableServices } from "@/data/escortData";
import UnifiedServiceGrid from "@/components/unified/UnifiedServiceGrid";

const Escorts: React.FC = () => {
  const { escorts, loading, error, fetchEscorts } = useEscorts({ initialData: mockEscorts });
  const { showInfo } = useNotifications();

  const handleRefresh = () => {
    fetchEscorts();
    if (showInfo) showInfo("Refreshing Data", "Getting the latest service providers");
  };
  
  return (
    <>
      <Helmet>
        <title>Premium Adult Service Directory | Find Verified Companions</title>
        <meta name="description" content="Browse our premium directory of verified adult service providers. Find companions, content creators, and livecam performers." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Service Directory</h1>
              <p className="text-muted-foreground">Find companions, content creators, and live cam performers</p>
            </div>
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
            <UnifiedServiceGrid 
              providers={escorts}
              isLoading={loading}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Escorts;
