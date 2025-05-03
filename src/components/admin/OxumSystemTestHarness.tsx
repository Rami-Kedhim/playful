
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  getOxumPriceSystemHealth, 
  validateGlobalPrice, 
  validateGlobalPriceWithRetry 
} from '@/utils/oxum/globalPricing';

const OxumSystemTestHarness: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [price, setPrice] = useState<string>('100');
  const [retries, setRetries] = useState<string>('3');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkSystemHealth = async () => {
    setIsLoading(true);
    try {
      const status = await getOxumPriceSystemHealth();
      setHealthStatus(status);
    } catch (error) {
      console.error('Error checking system health:', error);
      setHealthStatus({
        status: 'error',
        message: 'Failed to check system health'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validatePrice = async (withRetry: boolean = false) => {
    setIsLoading(true);
    setValidationResult(null);
    
    try {
      const priceValue = parseFloat(price);
      let result;
      
      if (withRetry) {
        const numRetries = parseInt(retries, 10);
        result = await validateGlobalPriceWithRetry(priceValue, numRetries);
      } else {
        result = await validateGlobalPrice(priceValue);
      }
      
      setValidationResult(result);
    } catch (error) {
      console.error('Error validating price:', error);
      setValidationResult({
        valid: false,
        error: 'Validation failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oxum Price System Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Button 
            onClick={checkSystemHealth}
            disabled={isLoading}
          >
            Check System Health
          </Button>
          
          {healthStatus && (
            <div className="mt-4 p-4 border rounded-md bg-muted/50">
              <p>Status: {healthStatus.status}</p>
              {healthStatus.message && <p>Message: {healthStatus.message}</p>}
              {healthStatus.uptime && <p>Uptime: {healthStatus.uptime}%</p>}
            </div>
          )}
        </div>
        
        <div className="border-t pt-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="price">Price Value</Label>
              <Input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="retries">Retries (for retry validation)</Label>
              <Input
                id="retries"
                type="text"
                value={retries}
                onChange={(e) => setRetries(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => validatePrice(false)}
                disabled={isLoading}
                variant="outline"
              >
                Validate Price
              </Button>
              <Button 
                onClick={() => validatePrice(true)}
                disabled={isLoading}
              >
                Validate With Retry
              </Button>
            </div>
            
            {validationResult && (
              <div className="p-4 border rounded-md bg-muted/50">
                <p>Valid: {validationResult.valid ? 'Yes' : 'No'}</p>
                {validationResult.message && <p>Message: {validationResult.message}</p>}
                {validationResult.retries !== undefined && <p>Retries used: {validationResult.retries}</p>}
                {validationResult.error && <p className="text-red-500">Error: {validationResult.error}</p>}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OxumSystemTestHarness;
