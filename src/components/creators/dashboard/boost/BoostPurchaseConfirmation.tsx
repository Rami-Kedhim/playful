import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { BoostPackage } from "@/types/boost";

interface BoostPurchaseConfirmationProps {
  selectedPackage: BoostPackage | null | undefined;
  onBack: () => void;
  onPurchase: () => Promise<void>;
  onCancel: () => void; // Add the required onCancel prop
  loading: boolean;
  ubxBalance?: number; // Make ubxBalance optional
}

const BoostPurchaseConfirmation = ({
  selectedPackage,
  ubxBalance = 0, // Default value
  onBack,
  onPurchase,
  onCancel, // Include in destructuring
  loading
}: BoostPurchaseConfirmationProps) => {
  if (!selectedPackage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Package Selected</CardTitle>
          <CardDescription>Please select a package before confirming purchase.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onBack}>Back to Selection</Button>
        </CardContent>
      </Card>
    );
  }

  const hasEnoughBalance = ubxBalance >= (selectedPackage.price_ubx || selectedPackage.price);
  const price = selectedPackage.price_ubx || selectedPackage.price;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Confirm Your Purchase</CardTitle>
          <CardDescription>
            Review your selected boost package and confirm your purchase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{selectedPackage.name}</h3>
            <p className="text-muted-foreground">{selectedPackage.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Price:</span>
              <p className="text-muted-foreground">
                {price} UBX
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">Your Balance:</span>
              <p className="text-muted-foreground">
                {ubxBalance} UBX
              </p>
            </div>
          </div>
          {!hasEnoughBalance && (
            <p className="text-red-500">
              You do not have enough UBX to purchase this boost.
            </p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack} 
          disabled={loading}
        >
          Back
        </Button>
        <Button 
          onClick={onPurchase} 
          disabled={loading || !hasEnoughBalance}
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </Button>
      </div>
    </div>
  );
};

export default BoostPurchaseConfirmation;
