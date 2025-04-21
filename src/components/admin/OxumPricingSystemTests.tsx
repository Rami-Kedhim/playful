
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { 
  runPricingSystemSelfTest, 
  getOxumPriceSystemHealth 
} from '@/utils/oxum/globalPricing';

const OxumPricingSystemTests = () => {
  const [testResults, setTestResults] = useState<any | null>(null);
  const [healthStatus, setHealthStatus] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      try {
        setLoading(true);
        const results = await runPricingSystemSelfTest();
        setTestResults(results);
        
        const health = await getOxumPriceSystemHealth();
        setHealthStatus(health);
      } catch (error) {
        console.error('Error running Oxum tests:', error);
      } finally {
        setLoading(false);
      }
    };
    
    runTests();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Info className="mr-2 h-5 w-5 text-blue-500" />
          Oxum Pricing System Tests
          <Badge variant="outline" className="ml-2">v2.3.1</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <Alert variant={testResults?.success ? "default" : "destructive"}>
              <div className="flex items-center gap-2">
                {testResults?.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <AlertTitle>
                  {testResults?.success ? "Self-Tests Passed" : "Self-Tests Failed"}
                </AlertTitle>
              </div>
              <AlertDescription className="pl-7 mt-1">
                <div>Tests Run: {testResults?.testsRun}</div>
                <div>Tests Passed: {testResults?.testsPassed}</div>
                {testResults?.failedTests?.length > 0 && (
                  <div>Tests Failed: {testResults.failedTests.length}</div>
                )}
              </AlertDescription>
            </Alert>
            
            {healthStatus && (
              <Alert>
                <AlertTitle>System Health Status: {healthStatus.status}</AlertTitle>
                <AlertDescription>
                  <div>Response Time: {healthStatus.metrics?.responseTime}ms</div>
                  <div>Error Rate: {(healthStatus.metrics?.errorRate * 100).toFixed(2)}%</div>
                  <div>Uptime: {healthStatus.metrics?.uptime}%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Last Updated: {new Date(healthStatus.lastUpdate).toLocaleString()}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OxumPricingSystemTests;
