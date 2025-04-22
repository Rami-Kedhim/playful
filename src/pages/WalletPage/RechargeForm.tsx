
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';

interface RechargeFormProps {
  onRecharge?: () => void;
}

const RechargeForm: React.FC<RechargeFormProps> = ({ onRecharge }) => {
  const [amount, setAmount] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call onRecharge callback if provided
      if (onRecharge) {
        onRecharge();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Funds</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[20, 50, 100, 200].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={amount === value ? 'default' : 'outline'}
                  onClick={() => handleAmountChange(value)}
                >
                  ${value}
                </Button>
              ))}
            </div>
            <div className="mt-2">
              <Input
                type="number"
                min={10}
                placeholder="Enter custom amount"
                value={amount || ''}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border rounded p-3">
                <RadioGroupItem value="credit_card" id="credit_card" />
                <Label htmlFor="credit_card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded p-3">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded p-3">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto">Cryptocurrency</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading || amount < 10} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Add $${amount || 0}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RechargeForm;
