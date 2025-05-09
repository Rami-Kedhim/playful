
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { BoostPackage } from "@/types/boost";

interface BoostPurchaseConfirmationProps {
  selectedPackage: BoostPackage | null;
  onConfirm?: () => void;
  onCancel: () => void;
  onPurchase?: () => void;
  onBack?: () => void;
  isLoading?: boolean;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  formatDuration?: (duration: string) => string;
  ubxBalance?: number;
}

const BoostPurchaseConfirmation: React.FC<BoostPurchaseConfirmationProps> = ({
  selectedPackage,
  onConfirm,
  onCancel,
  onPurchase,
  onBack,
  isLoading,
  loading,
  error,
  success,
  formatDuration = (duration) => duration || '',
  ubxBalance
}) => {
  // Form Validation
  const [agreed, setAgreed] = useState(false);
  
  if (!selectedPackage) {
    return null;
  }

  // Use either onConfirm or onPurchase
  const handleConfirm = () => {
    if (onPurchase) {
      onPurchase();
    } else if (onConfirm) {
      onConfirm();
    }
  };

  // Use either onCancel or onBack
  const handleCancel = () => {
    if (onBack) {
      onBack();
    } else if (onCancel) {
      onCancel();
    }
  };

  // Use either isLoading or loading
  const isProcessing = isLoading || loading;
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Confirm Boost Purchase</CardTitle>
        <CardDescription>
          You're about to purchase a boost for your profile
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {success ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-medium">Boost Activated!</h3>
            <p className="text-muted-foreground mt-1">
              Your profile is now boosted and will receive increased visibility
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-xl font-medium">Purchase Failed</h3>
            <p className="text-muted-foreground mt-1">{error}</p>
          </div>
        ) : (
          <>
            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span>Package:</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Duration:</span>
                <span>{formatDuration(selectedPackage.duration || '')}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Price:</span>
                <span className="font-bold">{selectedPackage.price_ubx || selectedPackage.price} UBX</span>
              </div>
              {ubxBalance !== undefined && (
                <div className="flex justify-between mb-2">
                  <span>Your Balance:</span>
                  <span>{ubxBalance} UBX</span>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-start mb-4">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 mt-1"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">
                  I understand that this boost will be active immediately and the UBX credits will be deducted from my account.
                </label>
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className={`flex ${success || error ? 'justify-center' : 'justify-between'}`}>
        {success ? (
          <Button onClick={handleCancel}>
            Close
          </Button>
        ) : error ? (
          <Button onClick={handleCancel}>
            Try Again
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleCancel} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!agreed || isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Purchase"
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BoostPurchaseConfirmation;
