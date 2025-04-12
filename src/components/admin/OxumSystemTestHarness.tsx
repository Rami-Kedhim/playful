
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, RefreshCw, Settings, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

import { validateGlobalPrice, validateGlobalPriceWithRetry, GLOBAL_UBX_RATE, runPricingSystemSelfTest, emergencyPriceValidationOverride } from '@/utils/oxum/globalPricing';
import { OxumPricingSystemTest } from '@/utils/oxum/pricingSystemTest';
import { OxumPriceAnalytics } from '@/services/analytics/oxumPriceAnalytics';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';

const OxumSystemTestHarness: React.FC = () => {
  const [activeTab, setActiveTab] = useState('manual');
  
  // Manual testing
  const [testPrice, setTestPrice] = useState(GLOBAL_UBX_RATE.toString());
  const [testResult, setTestResult] = useState<{success: boolean; message: string; timestamp: Date} | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Automated testing
  const [autoResults, setAutoResults] = useState<{
    totalTests: number;
    passed: number;
    failed: number;
    results: Array<{name: string; passed: boolean; error?: string}>;
  } | null>(null);
  const [edgeCaseResults, setEdgeCaseResults] = useState<Array<{name: string; passed: boolean; error?: string}>>([]);
  
  // Load testing
  const [loadTestResults, setLoadTestResults] = useState<{
    success: boolean;
    totalIterations: number;
    completedIterations: number;
    averageExecutionTime: number;
    maxExecutionTime: number;
    failureRate: number;
  } | null>(null);
  const [loadTestIterations, setLoadTestIterations] = useState(1000);
  const [loadTestInProgress, setLoadTestInProgress] = useState(false);
  
  // Admin tools
  const [adminKey, setAdminKey] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [adminResult, setAdminResult] = useState<{success: boolean; message: string} | null>(null);
  
  // Run basic validation test
  const runValidationTest = async () => {
    const priceValue = parseFloat(testPrice);
    setTestResult(null);
    setLoading(true);
    
    try {
      validateGlobalPrice(priceValue);
      setTestResult({
        success: true,
        message: `Price ${priceValue} is valid and complies with Oxum Rule #001.`,
        timestamp: new Date()
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date()
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Run full test suite
  const runAllTests = async () => {
    setLoading(true);
    try {
      const results = await OxumPricingSystemTest.runAllTests();
      setAutoResults(results);
    } catch (error) {
      console.error('Test suite error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Run edge case tests
  const runEdgeCaseTests = () => {
    setLoading(true);
    try {
      const results = OxumPricingSystemTest.testEdgeCases();
      setEdgeCaseResults(results);
    } catch (error) {
      console.error('Edge case test error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Run load test
  const runLoadTest = async () => {
    setLoadTestInProgress(true);
    try {
      const results = await OxumPricingSystemTest.runLoadTest(loadTestIterations);
      setLoadTestResults(results);
    } catch (error) {
      console.error('Load test error:', error);
    } finally {
      setLoadTestInProgress(false);
    }
  };
  
  // Emergency override
  const activateEmergencyOverride = () => {
    setLoading(true);
    try {
      const result = emergencyPriceValidationOverride(adminKey, overrideReason);
      setAdminResult({
        success: true,
        message: 'Emergency override activated successfully.'
      });
    } catch (error) {
      setAdminResult({
        success: false,
        message: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Clear all events (admin function)
  const clearAllEvents = () => {
    OxumPriceAnalytics.clearEvents();
    setAdminResult({
      success: true,
      message: 'All events cleared from analytics store.'
    });
  };
  
  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Oxum Pricing System Test Harness</CardTitle>
        <CardDescription>
          Test and validate the Oxum Rule #001 (Global Price Symmetry) enforcement system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="manual">Manual Testing</TabsTrigger>
            <TabsTrigger value="automated">Automated Tests</TabsTrigger>
            <TabsTrigger value="load">Load Testing</TabsTrigger>
            <TabsTrigger value="admin">Admin Tools</TabsTrigger>
          </TabsList>
          
          {/* Manual Testing Tab */}
          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="flex gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="test-price">Test Price (UBX)</Label>
                    <Input
                      id="test-price"
                      value={testPrice}
                      onChange={(e) => setTestPrice(e.target.value)}
                      placeholder="Enter price for validation"
                    />
                  </div>
                  <Button 
                    onClick={runValidationTest} 
                    disabled={loading}
                    className="mb-0.5"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Testing...
                      </>
                    ) : 'Validate Price'}
                  </Button>
                </div>
                
                {testResult && (
                  <Alert variant={testResult.success ? "default" : "destructive"}>
                    {testResult.success ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <AlertTitle>{testResult.success ? 'Success' : 'Validation Failed'}</AlertTitle>
                    <AlertDescription>
                      {testResult.message}
                      <div className="text-xs text-muted-foreground mt-2">
                        Test run: {formatTimestamp(testResult.timestamp)}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2">Test Instructions</h3>
                  <p className="text-sm">
                    Enter different price values to test the validation system:
                  </p>
                  <ul className="text-sm list-disc list-inside mt-2">
                    <li>Valid price: {GLOBAL_UBX_RATE} UBX</li>
                    <li>Invalid price (too high): {GLOBAL_UBX_RATE * 1.1} UBX</li>
                    <li>Invalid price (too low): {GLOBAL_UBX_RATE * 0.9} UBX</li>
                    <li>Edge case: 0 UBX (should fail)</li>
                    <li>Edge case: -100 UBX (should fail)</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="p-4 border rounded-md h-full">
                  <h3 className="font-medium mb-4">System Stats</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Events</div>
                      <div className="text-2xl font-bold">{OxumPriceAnalytics.getStats().totalEvents}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Compliance Rate</div>
                      <div className="text-2xl font-bold">
                        {OxumPriceAnalytics.getStats().complianceRate.toFixed(2)}%
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Validation Violations</div>
                      <div className="text-2xl font-bold">
                        {OxumPriceAnalytics.getStats().violationCount}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Recovery Mode</div>
                      <Badge variant={OxumNotificationService.isInRecoveryMode() ? "destructive" : "outline"}>
                        {OxumNotificationService.isInRecoveryMode() ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Automated Testing Tab */}
          <TabsContent value="automated" className="space-y-4">
            <div className="flex justify-between gap-4">
              <Button onClick={runAllTests} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Tests...
                  </>
                ) : 'Run All Tests'}
              </Button>
              <Button onClick={runEdgeCaseTests} disabled={loading} variant="outline">
                Test Edge Cases
              </Button>
            </div>
            
            {autoResults && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{autoResults.totalTests}</div>
                        <p className="text-xs text-muted-foreground">Total Tests</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">
                          {autoResults.passed}
                        </div>
                        <p className="text-xs text-muted-foreground">Passed</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">
                          {autoResults.failed}
                        </div>
                        <p className="text-xs text-muted-foreground">Failed</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {autoResults.results.map((result, index) => (
                        <TableRow key={`test-${index}`}>
                          <TableCell>{result.name}</TableCell>
                          <TableCell>
                            {result.passed ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                Passed
                              </Badge>
                            ) : (
                              <Badge variant="destructive">Failed</Badge>
                            )}
                          </TableCell>
                          <TableCell className="truncate max-w-[300px]">
                            {result.error || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            
            {edgeCaseResults.length > 0 && (
              <div className="border rounded-md overflow-hidden mt-4">
                <Table>
                  <TableCaption>Edge Case Test Results</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Edge Case</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {edgeCaseResults.map((result, index) => (
                      <TableRow key={`edge-${index}`}>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>
                          {result.passed ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Passed
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Failed</Badge>
                          )}
                        </TableCell>
                        <TableCell className="truncate max-w-[300px]">
                          {result.error || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {!autoResults && edgeCaseResults.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                Click "Run All Tests" or "Test Edge Cases" to start automated testing
              </div>
            )}
          </TabsContent>
          
          {/* Load Testing Tab */}
          <TabsContent value="load" className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="iterations">Test Iterations</Label>
                <Input
                  id="iterations"
                  type="number"
                  value={loadTestIterations}
                  onChange={(e) => setLoadTestIterations(parseInt(e.target.value) || 1000)}
                  min={100}
                  max={10000}
                />
                <p className="text-xs text-muted-foreground">
                  Higher values may affect system performance temporarily
                </p>
              </div>
              <Button
                onClick={runLoadTest}
                disabled={loadTestInProgress}
                className="mb-0.5"
              >
                {loadTestInProgress ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : 'Run Load Test'}
              </Button>
            </div>
            
            {loadTestResults && (
              <div className="space-y-4">
                <Alert variant={loadTestResults.success ? "default" : "destructive"}>
                  {loadTestResults.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {loadTestResults.success ? 'Load Test Successful' : 'Load Test Failed'}
                  </AlertTitle>
                  <AlertDescription>
                    System processed {loadTestResults.completedIterations} of {loadTestResults.totalIterations} iterations
                    with {loadTestResults.failureRate.toFixed(2)}% failure rate.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average Execution Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {loadTestResults.averageExecutionTime.toFixed(2)}ms
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Lower is better
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Maximum Execution Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {loadTestResults.maxExecutionTime.toFixed(2)}ms
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Worst case response time
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {!loadTestResults && !loadTestInProgress && (
              <div className="text-center p-8 text-muted-foreground">
                Configure and start a load test to evaluate system performance
              </div>
            )}
          </TabsContent>
          
          {/* Admin Tools Tab */}
          <TabsContent value="admin" className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
              <h3 className="flex items-center gap-2 font-medium text-amber-800">
                <Shield className="h-4 w-4" />
                Admin Tools - Use With Caution
              </h3>
              <p className="text-sm text-amber-800 mt-2">
                These tools affect the pricing system and should only be used by authorized personnel.
              </p>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Emergency Price Override</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-key">Admin Key</Label>
                  <Input
                    id="admin-key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    type="password"
                    placeholder="Enter admin authorization key"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="override-reason">Override Reason</Label>
                  <Input
                    id="override-reason"
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    placeholder="Provide reason for emergency override"
                  />
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button 
                    variant="destructive"
                    onClick={activateEmergencyOverride}
                    disabled={loading || !adminKey || !overrideReason}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : 'Activate Override'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={clearAllEvents}
                  >
                    Clear Analytics Data
                  </Button>
                </div>
              </div>
            </div>
            
            {adminResult && (
              <Alert variant={adminResult.success ? "default" : "destructive"}>
                {adminResult.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {adminResult.success ? 'Operation Successful' : 'Operation Failed'}
                </AlertTitle>
                <AlertDescription>
                  {adminResult.message}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Oxum Rule #001: Global Price Symmetry Enforcement
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // Refresh stats
              setTestResult(null);
              setAutoResults(null);
              setEdgeCaseResults([]);
              setLoadTestResults(null);
              setAdminResult(null);
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OxumSystemTestHarness;
