
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Define the PriceEvent type to fix errors
interface PriceEvent {
  id: string;
  timestamp: string;
  price: number;
  eventType: string;
  metadata?: Record<string, any>;
}

const OxumRuleComplianceMonitor: React.FC = () => {
  // Define the correct state type with all required properties
  const [stats, setStats] = useState<{
    totalEvents: number;
    violationCount: number;
    complianceRate: number;
    recentViolations: PriceEvent[];
    eventTypes?: Record<string, number>;
    averagePrice?: number;
  }>({
    totalEvents: 0,
    violationCount: 0,
    complianceRate: 100,
    recentViolations: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // This would be an API call in a real app
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data that includes all required properties
        const mockStats = {
          totalEvents: 152,
          eventTypes: { price_check: 130, price_violation: 22 },
          averagePrice: 15.2,
          violationCount: 22,
          complianceRate: 85.5,
          recentViolations: [
            {
              id: "1",
              timestamp: new Date().toISOString(),
              price: 16.5,
              eventType: "price_violation",
              metadata: { difference: 1.5 }
            },
            {
              id: "2",
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              price: 17,
              eventType: "price_violation",
              metadata: { difference: 2 }
            }
          ]
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching Oxum stats:', error);
      }
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const getComplianceColor = (rate: number) => {
    if (rate >= 95) return 'bg-green-500';
    if (rate >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Fix the argument handling in the function calls
  const handleRefresh = () => {
    // This would trigger the fetch stats logic
    console.log('Refreshing stats');
  };
  
  const handleClearViolations = () => {
    // This would call an API to clear violations
    console.log('Clearing violations');
  };

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Oxum Rule #001 Compliance</h3>
          <Badge variant={stats.complianceRate >= 95 ? 'outline' : 'destructive'}>
            {stats.complianceRate.toFixed(1)}% Compliance
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Compliance Rate</span>
              <span>{stats.complianceRate.toFixed(1)}%</span>
            </div>
            <Progress 
              value={stats.complianceRate} 
              className={`h-2 ${getComplianceColor(stats.complianceRate)}`}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-secondary p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">Total Price Checks</div>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
            </div>
            <div className="bg-secondary p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">Price Violations</div>
              <div className="text-2xl font-bold text-red-500">{stats.violationCount}</div>
            </div>
          </div>
          
          {stats.violationCount > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Price Violations Detected</AlertTitle>
              <AlertDescription>
                {stats.violationCount} price violations found. This may indicate attempts to circumvent the global price rule.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={handleRefresh} 
              className="px-3 py-1 bg-secondary rounded text-sm"
            >
              Refresh
            </button>
            <button 
              onClick={handleClearViolations}
              className="px-3 py-1 bg-secondary rounded text-sm"
            >
              Clear Violations
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OxumRuleComplianceMonitor;
