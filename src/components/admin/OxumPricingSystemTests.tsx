
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Play } from 'lucide-react';
import { OxumPricingSystemTest } from '@/utils/oxum/pricingSystemTest';
import { runPricingSystemSelfTest, getOxumPriceSystemHealth } from '@/utils/oxum/globalPricing';

const OxumPricingSystemTests: React.FC = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [loadTestResults, setLoadTestResults] = useState<any>(null);
  const [selfTestResults, setSelfTestResults] = useState<any>(null);
  const [systemHealth, setSystemHealth] = useState<any>(getOxumPriceSystemHealth());
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isRunningLoadTest, setIsRunningLoadTest] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const runTests = async () => {
    setIsRunningTests(true);
    try {
      const results = await OxumPricingSystemTest.runAllTests();
      setTestResults(results);
      
      // Update system health info
      setSystemHealth(getOxumPriceSystemHealth());
    } catch (error) {
      console.error("Error running tests:", error);
    } finally {
      setIsRunningTests(false);
    }
  };
  
  const runSelfTest = () => {
    try {
      const results = runPricingSystemSelfTest();
      setSelfTestResults(results);
    } catch (error) {
      console.error("Error running self-test:", error);
    }
  };
  
  const runLoadTest = async () => {
    setIsRunningLoadTest(true);
    try {
      const results = await OxumPricingSystemTest.runLoadTest(1000);
      setLoadTestResults(results);
      
      // Update system health info
      setSystemHealth(getOxumPriceSystemHealth());
    } catch (error) {
      console.error("Error running load test:", error);
    } finally {
      setIsRunningLoadTest(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Oxum Pricing System Tests</span>
          <Badge variant={systemHealth?.healthy ? "success" : "destructive"}>
            System Health: {systemHealth?.healthy ? "Healthy" : "Issues Detected"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Run tests to verify the Oxum Global Pricing system resilience
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Tests</TabsTrigger>
            <TabsTrigger value="load">Load Testing</TabsTrigger>
            <TabsTrigger value="health">System Health</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="flex justify-between mb-4">
              <div>
                <Button 
                  onClick={runTests} 
                  disabled={isRunningTests}
                  className="mr-2"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isRunningTests ? "Running Tests..." : "Run All Tests"}
                </Button>
                <Button 
                  onClick={runSelfTest} 
                  variant="outline"
                >
                  Run Self-Test
                </Button>
              </div>
              
              {testResults && (
                <div className="text-sm">
                  {testResults.passed}/{testResults.totalTests} tests passed
                </div>
              )}
            </div>
            
            {selfTestResults && (
              <Alert className={selfTestResults.success ? "border-green-600" : "border-red-600"}>
                <AlertTitle className="flex items-center">
                  {selfTestResults.success ? (
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                  )}
                  Self-Test Results
                </AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-1">
                    {selfTestResults.results.map((result: any, i: number) => (
                      <div key={i} className="flex items-center">
                        {result.passed ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2 text-red-600" />
                        )}
                        <span>{result.test}</span>
                        {!result.passed && result.message && (
                          <span className="ml-2 text-xs text-red-600">{result.message}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}
            
            {testResults && (
              <div className="space-y-4">
                <Progress value={(testResults.passed / testResults.totalTests) * 100} className="h-2" />
                
                <div className="space-y-2 max-h-72 overflow-auto p-2 border rounded">
                  {testResults.results.map((result: any, i: number) => (
                    <div key={i} className="flex p-2 border-b last:border-0">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2 flex-shrink-0 text-red-600" />
                      )}
                      <div>
                        <div>{result.name}</div>
                        {!result.passed && result.error && (
                          <div className="text-xs text-red-600">{result.error}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Alert variant={testResults.failed > 0 ? "destructive" : "default"}>
                  <AlertTitle>Test Summary</AlertTitle>
                  <AlertDescription>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                      <div>Total: {testResults.totalTests}</div>
                      <div className="text-green-600">Passed: {testResults.passed}</div>
                      {testResults.failed > 0 ? (
                        <div className="text-red-600">Failed: {testResults.failed}</div>
                      ) : (
                        <div>Failed: 0</div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="load" className="space-y-4">
            <div className="flex justify-between mb-4">
              <Button 
                onClick={runLoadTest} 
                disabled={isRunningLoadTest}
              >
                <Play className="mr-2 h-4 w-4" />
                {isRunningLoadTest ? "Running Load Test..." : "Run Load Test (1000 iterations)"}
              </Button>
              
              {loadTestResults && (
                <div className="text-sm">
                  {loadTestResults.completedIterations}/{loadTestResults.totalIterations} completed
                </div>
              )}
            </div>
            
            {loadTestResults && (
              <div className="space-y-4">
                <Progress 
                  value={(loadTestResults.completedIterations / loadTestResults.totalIterations) * 100} 
                  className="h-2" 
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm">Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Avg. Execution Time:</span>
                          <span>{loadTestResults.averageExecutionTime.toFixed(2)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Execution Time:</span>
                          <span>{loadTestResults.maxExecutionTime.toFixed(2)}ms</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm">Reliability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Success Rate:</span>
                          <span>{(100 - loadTestResults.failureRate).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Failure Rate:</span>
                          <span>{loadTestResults.failureRate.toFixed(2)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4">
            <div className="flex justify-between mb-4">
              <Button 
                onClick={() => setSystemHealth(getOxumPriceSystemHealth())}
              >
                Refresh System Health
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {systemHealth?.healthy ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-amber-600" />
                    )}
                    <div>
                      <div className="font-medium">
                        {systemHealth?.healthy ? "System Healthy" : "Issues Detected"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {systemHealth?.lastValidationTime 
                          ? `Last Check: ${new Date(systemHealth.lastValidationTime).toLocaleString()}`
                          : "No validation attempts yet"
                        }
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm">Error Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Failures:</span>
                      <span>{systemHealth?.failures || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consecutive Failures:</span>
                      <span className={systemHealth?.consecutiveFailures > 0 ? "text-red-600 font-medium" : ""}>
                        {systemHealth?.consecutiveFailures || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Alert variant={systemHealth?.consecutiveFailures > 0 ? "warning" : "default"}>
              <AlertTitle>System Health Parameters</AlertTitle>
              <AlertDescription>
                <p className="mt-2 text-sm">
                  The system monitors consecutive validation failures. If the count exceeds 5, 
                  the system will automatically enter recovery mode.
                </p>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OxumPricingSystemTests;
