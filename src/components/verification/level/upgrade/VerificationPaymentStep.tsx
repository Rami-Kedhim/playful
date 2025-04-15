
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

interface PaymentStepProps {
  targetLevel: string;
  loading: boolean;
  onBack: () => void;
  onComplete: () => void;
}

const VerificationPaymentStep = ({ targetLevel, loading, onBack, onComplete }: PaymentStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Complete Your Upgrade</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Your card will only be charged after your verification is approved
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span>Upgrade to {targetLevel} verification</span>
                <span>
                  {targetLevel === 'enhanced' ? '$9.99' : targetLevel === 'premium' ? '$29.99' : '$0'}
                </span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{targetLevel === 'enhanced' ? '$9.99' : targetLevel === 'premium' ? '$29.99' : '$0'}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  className="w-full p-2 border rounded-md"
                  disabled={loading}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiration</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full p-2 border rounded-md"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full p-2 border rounded-md"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>
        
        <Button onClick={onComplete} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...
            </>
          ) : (
            'Complete Purchase'
          )}
        </Button>
      </div>
    </div>
  );
};

export default VerificationPaymentStep;
