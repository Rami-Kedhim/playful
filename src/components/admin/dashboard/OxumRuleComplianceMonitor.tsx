
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, RefreshCw, ShieldAlert, Info, CircleDollarSign, Lock } from 'lucide-react';
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { OxumRuleEnforcement } from '@/services/oxum/OxumRuleEnforcement';

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
          <CardTitle className="text-xl flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Oxum Rule Compliance Monitor
          </CardTitle>
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
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4 text-green-600" />
                  Oxum Rule #001: Global Price Symmetry
                </h3>
                <p className="text-sm">
                  All boost pricing is uniform worldwide at {GLOBAL_UBX_RATE} UBX, ensuring fairness
                  and equality for all users regardless of location or economic status.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  Core Financial Principle: Zero-Fee User Transactions
                </h3>
                <p className="text-sm">
                  UberEscorts shall never impose fees, commissions, or revenue-sharing mechanisms on any
                  user-to-user interaction, whether related to bookings, tips, gifts, messaging, or content access.
                </p>
              </div>
              
              {stats.recentViolations.length > 0 && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Recent Violations Detected</AlertTitle>
                  <AlertDescription>
                    {stats.recentViolations.length} violation(s) in the last 24 hours. 
                    Check the Violations tab for details.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">Enforcement Active</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Yes</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">Global Price</span>
                      <Badge variant="outline">{GLOBAL_UBX_RATE} UBX</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">Admin Override</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700">Disabled</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Auditor Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">Auto-Audit Active</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Yes</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">Last Audit</span>
                      <span className="text-sm">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">Audit Frequency</span>
                      <span className="text-sm">5 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="violations">
            {stats.recentViolations.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Violations Detected</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  All transactions are currently compliant with the Oxum Rule. 
                  The system will alert you if any violations occur.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Expected</TableHead>
                    <TableHead>Difference</TableHead>
                    <TableHead>Transaction Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentViolations.map((violation, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(violation.timestamp)}</TableCell>
                      <TableCell>{violation.price} UBX</TableCell>
                      <TableCell>{GLOBAL_UBX_RATE} UBX</TableCell>
                      <TableCell className="text-red-600">
                        {(violation.price - GLOBAL_UBX_RATE).toFixed(2)} UBX
                      </TableCell>
                      <TableCell>{violation.transactionType}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Blocked</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          <TabsContent value="events">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Transaction Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allEvents.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(event.timestamp)}</TableCell>
                    <TableCell>{event.eventType}</TableCell>
                    <TableCell>{event.price} UBX</TableCell>
                    <TableCell>{event.transactionType}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={event.isCompliant ? "outline" : "destructive"}
                        className={event.isCompliant ? "bg-green-50 text-green-700" : ""}
                      >
                        {event.isCompliant ? "Compliant" : "Violation"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OxumRuleComplianceMonitor;
