
import { useState } from "react";
import {
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

import BankTransferForm from "./components/BankTransferForm";
import PaypalForm from "./components/PaypalForm";
import CryptoForm from "./components/CryptoForm";
import FormError from "./components/FormError";
import { isFormValid } from "./utils/formValidation";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid(amount, earnings.available, payoutMethod, details)) {
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

  const renderPayoutMethodForm = () => {
    switch (payoutMethod) {
      case "bank_transfer":
        return (
          <BankTransferForm 
            details={{
              accountName: details.accountName || "",
              accountNumber: details.accountNumber || "",
              bankName: details.bankName || ""
            }} 
            onChange={handleDetailsChange} 
          />
        );
      case "paypal":
        return (
          <PaypalForm 
            email={details.paypalEmail || ""} 
            onChange={handleDetailsChange} 
          />
        );
      case "crypto":
        return (
          <CryptoForm 
            walletAddress={details.walletAddress || ""} 
            onChange={handleDetailsChange} 
          />
        );
      default:
        return null;
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
        <FormError error={error} />

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

        {renderPayoutMethodForm()}

        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !isFormValid(amount, earnings.available, payoutMethod, details)}
          >
            {isSubmitting ? "Processing..." : "Request Payout"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default PayoutRequestForm;
