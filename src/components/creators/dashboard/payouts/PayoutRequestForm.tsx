
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PayoutRequestFormProps {
  earnings: {
    total: number;
    pending: number;
    available: number;
  };
  onRequestPayout: (data: {
    amount: number;
    payoutMethod: string;
    payoutDetails: Record<string, any>;
  }) => Promise<boolean>;
  onCancel: () => void;
}

const PayoutRequestForm = ({
  earnings,
  onRequestPayout,
  onCancel,
}: PayoutRequestFormProps) => {
  const [amount, setAmount] = useState<number>(earnings.available);
  const [payoutMethod, setPayoutMethod] = useState<string>("bank_transfer");
  const [details, setDetails] = useState<Record<string, string>>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setAmount(0);
    } else {
      setAmount(Math.min(value, earnings.available));
    }
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    if (amount <= 0 || amount > earnings.available) {
      return false;
    }

    if (payoutMethod === "bank_transfer") {
      return (
        details.accountName.trim() !== "" &&
        details.accountNumber.trim() !== "" &&
        details.bankName.trim() !== ""
      );
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError("Please fill all required fields with valid values");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const success = await onRequestPayout({
        amount,
        payoutMethod,
        payoutDetails: details,
      });
      
      if (!success) {
        setError("Failed to process payout request. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Request Payout</DialogTitle>
        <DialogDescription>
          Request a payout of your available earnings. Payouts typically process
          within 3-5 business days.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (Available: {earnings.available.toFixed(2)} LC)</Label>
          <Input
            id="amount"
            type="number"
            min="10"
            max={earnings.available}
            step="0.01"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payoutMethod">Payout Method</Label>
          <Select
            value={payoutMethod}
            onValueChange={setPayoutMethod}
          >
            <SelectTrigger id="payoutMethod">
              <SelectValue placeholder="Select payout method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {payoutMethod === "bank_transfer" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Holder Name</Label>
              <Input
                id="accountName"
                name="accountName"
                value={details.accountName}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                value={details.accountNumber}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                name="bankName"
                value={details.bankName}
                onChange={handleDetailsChange}
              />
            </div>
          </div>
        )}

        {payoutMethod === "paypal" && (
          <div className="space-y-2">
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              name="paypalEmail"
              type="email"
              value={details.paypalEmail || ""}
              onChange={handleDetailsChange}
            />
          </div>
        )}

        {payoutMethod === "crypto" && (
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              name="walletAddress"
              value={details.walletAddress || ""}
              onChange={handleDetailsChange}
            />
          </div>
        )}

        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? "Processing..." : "Request Payout"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default PayoutRequestForm;
