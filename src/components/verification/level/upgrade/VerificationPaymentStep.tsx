
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getVerificationRequirements } from '@/utils/verification/statusCheck';
import { VerificationLevel } from '@/types/verification';
import { ArrowLeft, CreditCard, Check, Loader } from 'lucide-react';

interface VerificationPaymentStepProps {
  targetLevel: VerificationLevel;
  loading: boolean;
  onBack: () => void;
  onComplete: () => void;
}

const VerificationPaymentStep: React.FC<VerificationPaymentStepProps> = ({
  targetLevel,
  loading,
  onBack,
  onComplete
}) => {
  const requirements = getVerificationRequirements(targetLevel);
  const fee = requirements.fee || 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Upgrade</CardTitle>
          <CardDescription>Please complete payment to proceed with your verification upgrade</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {fee > 0 ? (
            <>
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span>{targetLevel} Verification Fee</span>
                  <span className="font-medium">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Processing Fee</span>
                  <span>$0.00</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>${fee.toFixed(2)}</span>
              </div>
              
              <div className="border rounded-md p-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Credit or Debit Card</span>
                  </div>
                  <Check className="h-4 w-4 text-primary" />
                </div>
                
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground">
                    For demo purposes, no actual payment will be processed
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-start gap-3 bg-muted p-4 rounded-md">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">{targetLevel} Verification is Free</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  There is no fee for upgrading to this verification level. 
                  You can proceed with your upgrade immediately.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack} disabled={loading}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={onComplete} disabled={loading}>
            {loading ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Upgrade'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerificationPaymentStep;
