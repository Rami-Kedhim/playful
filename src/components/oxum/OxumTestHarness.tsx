
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

import { 
  runPricingSystemSelfTest,
  emergencyPriceValidationOverride
} from "@/utils/oxum/globalPricing";

const OxumTestHarness: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any | null>(null);
  const [overrideResults, setOverrideResults] = useState<any | null>(null);
  
  // Run system self-test
  const runSystemTest = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await runPricingSystemSelfTest();
      setTestResults(results);
    } catch (err: any) {
      setError(err.message || "An error occurred running system tests");
    } finally {
      setLoading(false);
    }
  };
  
  // Run emergency override
  const runEmergencyOverride = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await emergencyPriceValidationOverride({ force: true });
      setOverrideResults(results);
    } catch (err: any) {
      setError(err.message || "An error occurred with emergency override");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Oxum System Test Harness 
            <Badge variant={loading ? "outline" : (testResults?.success ? "success" : "destructive")}>
              {loading ? "Running..." : (testResults?.success ? "Healthy" : "Needs Attention")}
            </Badge>
          </CardTitle>
          <CardDescription>
            Run diagnostics and system tests for the Oxum pricing system
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}
          
          {testResults && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Tests Completed</p>
                  <p className="text-2xl font-bold">{testResults.testsRun}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tests Passed</p>
                  <p className="text-2xl font-bold text-green-500">{testResults.testsPassed}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Pass Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round((testResults.testsPassed / testResults.testsRun) * 100)}%
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">System Health</p>
                <Progress 
                  value={(testResults.testsPassed / testResults.testsRun) * 100} 
                  className="h-2" 
                />
              </div>
              
              {testResults.failedTests.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Failed Tests</p>
                  <ul className="list-disc pl-5">
                    {testResults.failedTests.map((test: any, index: number) => (
                      <li key={index} className="text-sm text-destructive">
                        {test.name}: {test.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {overrideResults && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <p className="font-medium text-amber-500">Emergency Override</p>
                </div>
                <Badge variant={overrideResults.success ? "outline" : "destructive"}>
                  {overrideResults.success ? "Applied" : "Failed"}
                </Badge>
              </div>
              <p className="text-sm mt-2">{overrideResults.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Applied at: {new Date(overrideResults.timestamp).toLocaleString()}
              </p>
            </div>
          )}
          
          <div className="flex gap-4">
            <Button onClick={runSystemTest} disabled={loading}>
              {loading ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Running Tests</>
              ) : (
                <><CheckCircle2 className="h-4 w-4 mr-2" /> Run System Tests</>
              )}
            </Button>
            
            <Button onClick={runEmergencyOverride} disabled={loading} variant="destructive">
              Emergency Override
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OxumTestHarness;
