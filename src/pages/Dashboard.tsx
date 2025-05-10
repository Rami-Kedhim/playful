
import React, { useEffect } from 'react';
import { useSystemHealth } from '@/hooks/useSystemHealth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, RefreshCw, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { systemHealth, loading, refreshSystemHealth, subsystemStatus, restartSubsystem } = useSystemHealth();
  
  useEffect(() => {
    refreshSystemHealth();
  }, [refreshSystemHealth]);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Dashboard</h1>
        <Button onClick={refreshSystemHealth} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : `${systemHealth?.uptime || 0}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : `${systemHealth?.responseTime || 0}ms`}
            </div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : `${systemHealth?.errorRate || 0}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Subsystem Status</h2>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {subsystemStatus.map((subsystem) => (
            <Card key={subsystem.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3">
                <div>
                  <CardTitle>{subsystem.name}</CardTitle>
                  <CardDescription>{subsystem.status}</CardDescription>
                </div>
                {subsystem.status !== 'operational' && (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
              </CardHeader>
              <CardContent className="pb-2">
                <Progress value={subsystem.health} className="h-2 w-full" />
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <p className="text-sm text-muted-foreground">Health: {subsystem.health}%</p>
                {subsystem.status !== 'operational' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => restartSubsystem(subsystem.name)}
                  >
                    Restart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
