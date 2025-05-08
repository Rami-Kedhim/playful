
import React, { useEffect, useState } from 'react';
import { oxum } from '@/core/Oxum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OxumPage = () => {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        // Use getSystemStatus instead of checkSystemStatus
        const status = oxum.getSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Failed to fetch system status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSystemStatus();
  }, []);
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Oxum System</h1>
      
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <span>Loading system status...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operational:</span>
                  <span className="font-medium">{systemStatus?.isOperational ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Performance:</span>
                  <span className="font-medium">{systemStatus?.performance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update:</span>
                  <span className="font-medium">{new Date(systemStatus?.lastUpdate).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OxumPage;
