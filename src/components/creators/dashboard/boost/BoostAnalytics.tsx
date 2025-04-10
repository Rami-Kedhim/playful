
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import BoostAnalyticsCard from "./BoostAnalyticsCard";
import BoostHistoryTable from "./BoostHistoryTable";
import HermesOxumQueueVisualization from "./HermesOxumQueueVisualization";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics";

interface BoostAnalyticsProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
  creatorId: string; // Added creatorId prop
}

const BoostAnalytics = ({ isActive, getAnalytics, creatorId }: BoostAnalyticsProps) => {
  const [boostHistory, setBoostHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch boost history data
    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);
        // Mock history data
        setTimeout(() => {
          setBoostHistory([
            {
              id: "history-1",
              startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
              endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              boostPackage: {
                id: "boost-1",
                name: "Weekend Boost",
                duration: "72:00:00",
                price_lucoin: 120
              },
              price: 120
            },
            {
              id: "history-2",
              startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
              endDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
              boostPackage: {
                id: "boost-2",
                name: "24 Hour Boost",
                duration: "24:00:00",
                price_lucoin: 50
              },
              price: 50
            }
          ]);
          setHistoryLoading(false);
        }, 1000);
      } catch (err: any) {
        setError(err.message || "Failed to fetch history data");
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BoostAnalyticsCard 
          isActive={isActive} 
          getAnalytics={getAnalytics}
        />
        
        {/* Add the Hermes-Oxum Queue Visualization when boost is active */}
        {isActive && creatorId && (
          <HermesOxumQueueVisualization profileId={creatorId} />
        )}
      </div>
      
      <BoostHistoryTable 
        history={boostHistory}
        loading={historyLoading}
      />
    </div>
  );
};

export default BoostAnalytics;
