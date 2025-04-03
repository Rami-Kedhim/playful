
import { useState } from "react";
import { 
  DialogContent, DialogHeader, DialogTitle, DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";

interface PayoutRequestFormProps {
  earnings: {
    available: number;
  };
  onRequestPayout: (
    amount: number, 
    payoutMethod: string, 
    payoutDetails: Record<string, any>
  ) => Promise<void>;
  onCancel: () => void;
}

const PayoutRequestForm = ({ 
  earnings, 
  onRequestPayout, 
  onCancel 
}: PayoutRequestFormProps) => {
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("bank_transfer");
  const [payoutDetails, setPayoutDetails] = useState({
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    paypalEmail: "",
    walletAddress: ""
  });

  const handleSubmit = () => {
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) return;
    
    // Extract only the relevant details based on the payout method
    const relevantDetails = {} as Record<string, any>;
    
    if (payoutMethod === 'bank_transfer') {
      relevantDetails.accountName = payoutDetails.accountName;
      relevantDetails.accountNumber = payoutDetails.accountNumber;
      relevantDetails.routingNumber = payoutDetails.routingNumber;
    } else if (payoutMethod === 'paypal') {
      relevantDetails.paypalEmail = payoutDetails.paypalEmail;
    } else if (payoutMethod === 'crypto') {
      relevantDetails.walletAddress = payoutDetails.walletAddress;
    }
    
    onRequestPayout(parseFloat(payoutAmount), payoutMethod, relevantDetails);
  };

  const handleInputChange = (field: string, value: string) => {
    setPayoutDetails({
      ...payoutDetails,
      [field]: value
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Request a Payout</DialogTitle>
        <DialogDescription>
          Enter the amount you want to withdraw and your payment details.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="payoutAmount">Amount</Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              id="payoutAmount"
              type="number"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              className="pl-7"
              placeholder="0.00"
              min="10"
              max={earnings.available}
              step="0.01"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Available balance: ${earnings.available.toFixed(2)}
          </p>
        </div>
        
        <div>
          <Label htmlFor="payoutMethod">Payout Method</Label>
          <Select
            value={payoutMethod}
            onValueChange={setPayoutMethod}
          >
            <SelectTrigger id="payoutMethod" className="mt-1">
              <SelectValue placeholder="Select payout method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {payoutMethod === 'bank_transfer' && (
          <>
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={payoutDetails.accountName}
                onChange={(e) => handleInputChange('accountName', e.target.value)}
                className="mt-1"
                placeholder="Enter account name"
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={payoutDetails.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="mt-1"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={payoutDetails.routingNumber}
                onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                className="mt-1"
                placeholder="Enter routing number"
              />
            </div>
          </>
        )}
        
        {payoutMethod === 'paypal' && (
          <div>
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              type="email"
              value={payoutDetails.paypalEmail}
              onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
              placeholder="Enter PayPal email"
              className="mt-1"
            />
          </div>
        )}
        
        {payoutMethod === 'crypto' && (
          <div>
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              value={payoutDetails.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
              placeholder="Enter wallet address"
              className="mt-1"
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={
            !payoutAmount || 
            parseFloat(payoutAmount) <= 0 || 
            parseFloat(payoutAmount) > earnings.available
          }
        >
          Request Payout
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default PayoutRequestForm;
