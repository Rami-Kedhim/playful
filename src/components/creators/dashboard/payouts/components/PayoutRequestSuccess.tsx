
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PayoutRequestSuccessProps {
  amount: number;
  onClose: () => void;
}

const PayoutRequestSuccess = ({ amount, onClose }: PayoutRequestSuccessProps) => {
  return (
    <Alert variant="success" className="bg-green-50 dark:bg-green-950/50 border-green-500/30">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle>Payout Request Successful</AlertTitle>
      <AlertDescription className="mt-2">
        <p>Your payout request for {amount.toFixed(2)} LC has been successfully submitted.</p>
        <p className="mt-2">You can track the status of your payout in the history section below.</p>
        <Button onClick={onClose} className="mt-4" variant="outline">
          Close
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default PayoutRequestSuccess;
