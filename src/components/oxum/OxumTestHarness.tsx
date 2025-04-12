
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { validateGlobalPrice, validateGlobalPriceWithRetry, GLOBAL_UBX_RATE, emergencyPriceValidationOverride, runPricingSystemSelfTest } from '@/utils/oxum/globalPricing';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';
import UBXPriceDisplay from './UBXPriceDisplay';

const OxumTestHarness: React.FC = () => {
  const [price, setPrice] = useState<number>(GLOBAL_UBX_RATE);
  const [testResult, setTestResult] = useState<{success: boolean, message: string} | null>(null);
  const [adminKey, setAdminKey] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [overrideResult, setOverrideResult] = useState<string | null>(null);
  const [systemHealthy, setSystemHealthy] = useState<boolean>(true);
  const [isInRecovery, setIsInRecovery] = useState<boolean>(false);
  
  // Test normal price validation
  const testValidation = () => {
    try {
      validateGlobalPrice(price);
      setTestResult({
        success: true,
        message: `Price ${price} is valid according to Oxum Rule #001`
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        message: error.message || 'Validation failed'
      });
    }
  };
  
  // Test resilient validation with retry
  const testResilientValidation = async () => {
    try {
      const result = await validateGlobalPriceWithRetry(price);
      setTestResult({
        success: true,
        message: `Price ${price} is valid (resilient validation successful)`
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        message: `Resilient validation failed: ${error.message || 'Unknown error'}`
      });
    }
  };
  
  // Test emergency override
  const testEmergencyOverride = () => {
    try {
      emergencyPriceValidationOverride(adminKey, overrideReason);
      setOverrideResult('Emergency override successful');
    } catch (error: any) {
      setOverrideResult(`Override failed: ${error.message || 'Unknown error'}`);
    }
  };
  
  // Run self-test
  const testSelfTest = () => {
    const result = runPricingSystemSelfTest();
    
    if (result.success) {
      setTestResult({
        success: true,
        message: `Self-test passed: ${result.results.filter(r => r.passed).length}/${result.results.length} tests passed`
      });
    } else {
      setTestResult({
        success: false,
        message: `Self-test failed: ${result.results.filter(r => !r.passed).length}/${result.results.length} tests failed`
      });
    }
  };
  
  // Check system status
  const refreshSystemStatus = () => {
    // In a real app, this would call an API or check the actual system health
    setIsInRecovery(OxumNotificationService.isInRecoveryMode());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Oxum Price Enforcement Test Harness</CardTitle>
        <CardDescription>
          Test the resilience of the Oxum Global Price Symmetry system
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="validation" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="validation">Price Validation</TabsTrigger>
            <TabsTrigger value="override">Admin Override</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="validation" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Test Price (Current Global Rate: {GLOBAL_UBX_RATE} UBX)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    min={0} 
                    max={2000} 
                    step={10}
                    value={[price]}
                    onValueChange={(val) => setPrice(val[0])}
                    className="flex-1"
                  />
                  <Input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))} 
                    className="w-24"
                  />
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <UBXPriceDisplay 
                  amount={price} 
                  isGlobalPrice={price === GLOBAL_UBX_RATE}
                  showConversion={true}
                />
                
                <div className="text-sm text-muted-foreground">
                  {price === GLOBAL_UBX_RATE ? (
                    <span className="text-green-600">✓ Matches Oxum Global Price</span>
                  ) : (
                    <span className="text-red-600">✗ Does not match Oxum Global Price</span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button onClick={testValidation}>
                  Test Standard Validation
                </Button>
                <Button onClick={testResilientValidation} variant="outline">
                  Test Resilient Validation
                </Button>
                <Button onClick={testSelfTest} variant="secondary">
                  Run Self-Test
                </Button>
              </div>
              
              {testResult && (
                <Alert variant={testResult.success ? "default" : "destructive"} className="mt-4">
                  <AlertTitle>{testResult.success ? 'Success' : 'Validation Failed'}</AlertTitle>
                  <AlertDescription>{testResult.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="override" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Admin Key</Label>
                <Input 
                  type="password" 
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)} 
                  placeholder="Enter admin override key"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Override Reason</Label>
                <Input 
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)} 
                  placeholder="Enter reason for the emergency override"
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={testEmergencyOverride} variant="destructive">
                  Test Emergency Override
                </Button>
              </div>
              
              {overrideResult && (
                <Alert variant="warning" className="mt-4">
                  <AlertTitle>Override Result</AlertTitle>
                  <AlertDescription>{overrideResult}</AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between">
                <Button onClick={refreshSystemStatus} variant="outline">
                  Refresh System Status
                </Button>
              </div>
              
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className={`h-3 w-3 rounded-full ${systemHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="font-medium">
                        {systemHealthy ? 'System Healthy' : 'System Degraded'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`h-3 w-3 rounded-full ${isInRecovery ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                      <span className="font-medium">
                        {isInRecovery ? 'Recovery Mode Active' : 'Normal Operation Mode'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Alert>
                <AlertTitle>System Information</AlertTitle>
                <AlertDescription>
                  <p className="text-sm mt-2">
                    The Oxum Price Enforcement system monitors transaction validity and can 
                    automatically enter recovery mode if multiple price violations are detected.
                    In recovery mode, additional protections are enforced to maintain price integrity.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        This test harness is for development and debugging purposes only.
      </CardFooter>
    </Card>
  );
};

export default OxumTestHarness;
