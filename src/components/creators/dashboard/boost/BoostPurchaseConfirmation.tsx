
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BoostPackage } from "@/types/boost";
import { formatBoostDuration } from "@/utils/boostCalculator";

interface BoostPurchaseConfirmationProps {
  selectedPackage: BoostPackage | undefined;
  lucoinBalance: number;
  onBack: () => void;
  onPurchase: () => void;
  loading: boolean;
}

const BoostPurchaseConfirmation = ({
  selectedPackage,
  lucoinBalance,
  onBack,
  onPurchase,
  loading
}: BoostPurchaseConfirmationProps) => {
  const insufficientBalance = selectedPackage && 
    lucoinBalance < selectedPackage.price_lucoin;

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Confirm Your Purchase</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Package:</div>
          <div>
            {selectedPackage?.name}
          </div>
          
          <div className="text-sm text-muted-foreground">Duration:</div>
          <div>
            {formatBoostDuration(selectedPackage?.duration || "")}
          </div>
          
          <div className="text-sm text-muted-foreground">Price:</div>
          <div className="font-medium">
            {selectedPackage?.price_lucoin} LC
          </div>
          
          <div className="text-sm text-muted-foreground">Current Balance:</div>
          <div className={insufficientBalance ? "text-red-500" : ""}>
            {lucoinBalance} LC
          </div>
        </div>
        
        {insufficientBalance && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Insufficient Balance</AlertTitle>
            <AlertDescription>
              You don't have enough Lucoins to purchase this boost. Please add more credits to your account.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          onClick={onPurchase} 
          disabled={loading || insufficientBalance}
        >
          Complete Purchase
        </Button>
      </div>
    </div>
  );
};

export default BoostPurchaseConfirmation;
