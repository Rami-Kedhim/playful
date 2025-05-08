
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WalletRechargePage = () => {
  return (
    <UnifiedLayout
      title="Recharge Wallet"
      description="Add funds to your UberEscorts wallet"
      showBreadcrumbs
    >
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (UBX)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" min="1" />
              </div>
              
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" variant="outline" className="justify-start">
                    Credit Card
                  </Button>
                  <Button type="button" variant="outline" className="justify-start">
                    Crypto
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full">Recharge Now</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default WalletRechargePage;
