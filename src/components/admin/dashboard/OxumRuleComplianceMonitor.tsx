
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, RefreshCw, ShieldAlert } from 'lucide-react';
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';

const OxumRuleComplianceMonitor: React.FC = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    violationCount: 0,
    complianceRate: 100,
    recentViolations: [] as any[]
  });
  
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Refresh data
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  useEffect(() => {
    // Get stats from the analytics service
    const currentStats = OxumPriceAnalytics.getStats();
    setStats(currentStats);
    
    // Set up periodic refresh
    const interval = setInterval(() => {
      const updatedStats = OxumPriceAnalytics.getStats();
      setStats(updatedStats);
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [refreshKey]);
  
  // Get all events for the events tab
  const allEvents = OxumPriceAnalytics.getEvents();
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Oxum Rule #001 Compliance Monitor</CardTitle>
          <CardDescription>
            Global Price Symmetry enforcement tracking and analytics
          </CardDescription>
        </div>
        <Button 
          variant="outline"
          size="sm"
          className="h-8 gap-1"
          onClick={refreshData}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </Button>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground">Total Price Events</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center">
                  {stats.complianceRate.toFixed(2)}%
                  {stats.complianceRate < 98 ? (
                    <AlertTriangle className="h-4 w-4 ml-1 text-amber-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Compliance Rate</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stats.violationCount > 0 ? 'text-red-500' : ''}`}>
                  {stats.violationCount}
                </div>
                <p className="text-xs text-muted-foreground">Rule Violations</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="violations">Violations</TabsTrigger>
            <TabsTrigger value="events">All Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Oxum Rule #001: Global Price Symmetry</h3>
                <p className="text-sm">
                  All boost pricing is uniform worldwide at {GLOBAL_UBX_RATE} UBX, ensuring fairness
                  and equality for all users regardless of location or economic status.
                </p>
              </div>
              
              {stats.recentViolations.length > 0 && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Recent Violations Detected</AlertTitle>
                  <AlertDescription>
                    {stats.recentViolations.length} price violations in the last 24 hours.
                    Check the Violations tab for more details.
                  </AlertDescription>
                </Alert>
              )}
              
              {stats.complianceRate < 98 && (
                <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Compliance Warning</AlertTitle>
                  <AlertDescription>
                    The system compliance rate is below 98%. Please review recent transactions and ensure proper price enforcement.
                  </AlertDescription>
                </Alert>
              )}
              
              {stats.complianceRate >= 98 && stats.recentViolations.length === 0 && (
                <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>System Compliant</AlertTitle>
                  <AlertDescription>
                    All systems enforcing Oxum Rule #001 are operating correctly.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="violations">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Profile ID</TableHead>
                    <TableHead>Actual Price</TableHead>
                    <TableHead>Expected Price</TableHead>
                    <TableHead>Difference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {OxumPriceAnalytics.getEvents({ eventType: 'price_violation' }).map((event, i) => (
                    <TableRow key={`violation-${i}`}>
                      <TableCell>{formatDate(event.timestamp)}</TableCell>
                      <TableCell>{event.userId || 'N/A'}</TableCell>
                      <TableCell>{event.profileId || 'N/A'}</TableCell>
                      <TableCell>{event.amount} UBX</TableCell>
                      <TableCell>{event.expectedAmount} UBX</TableCell>
                      <TableCell className="text-red-500">
                        {event.amount - (event.expectedAmount || 0)} UBX
                      </TableCell>
                    </TableRow>
                  ))}
                  {OxumPriceAnalytics.getEvents({ eventType: 'price_violation' }).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No violations detected
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allEvents.slice(0, 100).map((event, i) => (
                    <TableRow key={`event-${i}`}>
                      <TableCell>{formatDate(event.timestamp)}</TableCell>
                      <TableCell>
                        {event.eventType === 'price_check' && 'Price Check'}
                        {event.eventType === 'price_violation' && 'Violation'}
                        {event.eventType === 'price_transaction' && 'Transaction'}
                      </TableCell>
                      <TableCell>{event.amount} UBX</TableCell>
                      <TableCell>
                        {event.eventType === 'price_violation' ? (
                          <Badge variant="destructive">Failed</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800">Passed</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {allEvents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No events recorded
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OxumRuleComplianceMonitor;
