
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Info, Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  runPricingSystemSelfTest, 
  getOxumPriceSystemHealth, 
  emergencyPriceValidationOverride,
  validateGlobalPrice,
  validateGlobalPriceWithRetry,
  GLOBAL_UBX_RATE
} from "@/utils/oxum/globalPricing";

interface TestResult {
  success: boolean;
  timestamp: string;
  message: string;
  details?: any;
}

const OxumSystemTestHarness: React.FC = () => {
  const [activeTab, setActiveTab] = useState("diagnostics");
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);
  const [healthData, setHealthData] = useState<any>(null);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  
  const runDiagnostics = async () => {
    setIsRunningTests(true);
    try {
      const result = await runPricingSystemSelfTest();
      setLastTestResult({
        success: result.success,
        timestamp: new Date().toISOString(),
        message: result.success 
          ? `Self-test completed successfully. All ${result.testsPassed} tests passed.`
          : `Self-test failed. ${result.failedTests.length} tests failed.`,
        details: result
      });
      
      // Also update health data
      const health = await getOxumPriceSystemHealth();
      setHealthData(health);
    } catch (error: any) {
      setLastTestResult({
        success: false,
        timestamp: new Date().toISOString(),
        message: `Error running diagnostics: ${error.message || 'Unknown error'}`,
      });
    } finally {
      setIsRunningTests(false);
    }
  };
  
  const toggleEmergencyMode = async () => {
    try {
      const newMode = !isEmergencyMode;
      const result = await emergencyPriceValidationOverride({ force: newMode });
      
      if (result.success) {
        setIsEmergencyMode(newMode);
        setLastTestResult({
          success: true,
          timestamp: result.timestamp,
          message: result.message,
          details: { emergencyMode: newMode }
        });
      } else {
        setLastTestResult({
          success: false,
          timestamp: result.timestamp,
          message: result.message,
          details: { emergencyMode: isEmergencyMode } // Unchanged
        });
      }
    } catch (error: any) {
      setLastTestResult({
        success: false,
        timestamp: new Date().toISOString(),
        message: `Error toggling emergency mode: ${error.message || 'Unknown error'}`,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-muted/40">
        <CardTitle className="flex items-center text-lg">
          <Terminal className="mr-2 h-5 w-5" />
          Oxum System Test Harness
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Oxum Rule #001 Global Price Check System</span>
          <Badge variant="outline" className="ml-2">v2.3.1</Badge>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mx-6 my-2">
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Controls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="diagnostics" className="p-0">
          <CardContent className="space-y-4 pt-2">
            {lastTestResult && (
              <Alert variant={lastTestResult.success ? "default" : "destructive"}>
                {lastTestResult.success ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>{lastTestResult.success ? 'Test Passed' : 'Test Failed'}</AlertTitle>
                <AlertDescription>
                  {lastTestResult.message}
                  {lastTestResult.details && lastTestResult.details.testsRun && (
                    <div className="mt-2 text-xs">
                      <div>Tests run: {lastTestResult.details.testsRun}</div>
                      <div>Tests passed: {lastTestResult.details.testsPassed}</div>
                      {lastTestResult.details.failedTests?.length > 0 && (
                        <div>Failed tests: {lastTestResult.details.failedTests.length}</div>
                      )}
                    </div>
                  )}
                  <div className="text-xs mt-2 opacity-70">
                    {new Date(lastTestResult.timestamp).toLocaleString()}
                  </div>
                </AlertDescription>
              </Alert>
            )}
            
            <div className="text-sm">
              <p>Run diagnostics on the Oxum Global Price System to verify rule enforcement.</p>
              <div className="mt-4 bg-muted p-3 rounded-md text-xs">
                <p><strong>Note:</strong> This will test the following components:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Global Price Rule Enforcement</li>
                  <li>Price Validation Routines</li>
                  <li>Tolerance Calculators</li>
                  <li>Override Permission System</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={runDiagnostics} disabled={isRunningTests}>
              {isRunningTests ? 'Running Tests...' : 'Run Diagnostics'}
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="health" className="p-0">
          <CardContent className="space-y-4 pt-4">
            {healthData ? (
              <div className="space-y-4">
                <Alert variant={healthData.status === 'healthy' ? 'default' : 'warning'}>
                  <Info className="h-4 w-4" />
                  <AlertTitle>System Status: {healthData.status}</AlertTitle>
                  <AlertDescription>
                    Last updated: {new Date(healthData.lastUpdate).toLocaleString()}
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthData.metrics.responseTime}ms</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Error Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{(healthData.metrics.errorRate * 100).toFixed(2)}%</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Uptime</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{healthData.metrics.uptime}%</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-muted-foreground">No health data available</div>
                <Button onClick={runDiagnostics} className="mt-4" variant="outline">
                  Fetch Health Data
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="emergency" className="p-0">
          <CardContent className="space-y-4 pt-4">
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Emergency Controls</AlertTitle>
              <AlertDescription>
                These controls should only be used in emergency situations. All actions are logged.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emergency-mode" className="font-medium">
                    Emergency Override Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Disables automatic rule enforcement
                  </p>
                </div>
                <Switch 
                  id="emergency-mode" 
                  checked={isEmergencyMode} 
                  onCheckedChange={toggleEmergencyMode}
                />
              </div>
              
              <div className="text-sm bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 rounded-md">
                <p className="font-medium text-red-700 dark:text-red-400">Warning:</p>
                <p className="mt-1 text-red-600 dark:text-red-300">
                  Enabling emergency mode will bypass all Oxum Rule #001 price validations.
                  The global price of {GLOBAL_UBX_RATE} UBX will not be enforced while this mode is active.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button 
              variant="destructive" 
              disabled={!isEmergencyMode} 
              onClick={() => emergencyPriceValidationOverride({ force: false })}
            >
              Force Disable Emergency Mode
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default OxumSystemTestHarness;
