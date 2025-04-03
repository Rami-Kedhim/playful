
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchCreatorPayouts, requestPayout } from "@/services/creatorService";
import { 
  DollarSign, CreditCard, Clock, Calendar, ChevronDown, ChevronUp, 
  ArrowUpRight, TrendingUp, Info, CreditCard as CreditCardIcon
} from "lucide-react";
import { format } from "date-fns";

interface CreatorPayoutsProps {
  creatorId: string;
}

const CreatorPayouts = ({ creatorId }: CreatorPayoutsProps) => {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [earnings, setEarnings] = useState({
    total: 0,
    available: 0,
    pending: 0,
    thisMonth: 0
  });
  const [payoutMethod, setPayoutMethod] = useState("bank_transfer");
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutDetails, setPayoutDetails] = useState({
    accountName: "",
    accountNumber: "",
    routingNumber: ""
  });

  useEffect(() => {
    if (creatorId) {
      loadPayouts();
    }
  }, [creatorId]);

  const loadPayouts = async () => {
    setIsLoading(true);
    const data = await fetchCreatorPayouts(creatorId);
    setPayouts(data);
    
    // Calculate earnings summary
    // In a real app, you would fetch this from an API
    const mockEarnings = {
      total: 2347.85,
      available: 1250.42,
      pending: 567.25,
      thisMonth: 892.15
    };
    
    setEarnings(mockEarnings);
    setIsLoading(false);
  };

  const handlePayoutRequest = async () => {
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      return;
    }
    
    const details = {
      ...payoutDetails,
      method: payoutMethod
    };
    
    await requestPayout(creatorId, parseFloat(payoutAmount), payoutMethod, details);
    setDialogOpen(false);
    loadPayouts();
  };

  const getPayoutStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPayoutMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return <CreditCard className="h-4 w-4" />;
      case 'paypal':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Earnings & Payouts</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <CreditCardIcon className="mr-2 h-4 w-4" />
          Request Payout
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.total.toFixed(2)}</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.available.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">
                Available for withdrawal
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Pending Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.pending.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">
                Processing (1-3 days)
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.thisMonth.toFixed(2)}</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Track all your payout requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between p-4 border rounded-md">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/6" />
                </div>
              ))}
            </div>
          ) : payouts.length === 0 ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>No payouts yet</AlertTitle>
              <AlertDescription>
                You haven't requested any payouts yet. Once you have earnings, you can request a payout.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {payouts.map((payout) => (
                <div key={payout.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {getPayoutMethodIcon(payout.payout_method)}
                    </div>
                    <div>
                      <div className="font-medium">
                        Payout via {payout.payout_method.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(payout.created_at), "MMMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="font-bold">${parseFloat(payout.amount).toFixed(2)}</div>
                    <div>{getPayoutStatusBadge(payout.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                    onChange={(e) => setPayoutDetails({...payoutDetails, accountName: e.target.value})}
                    className="mt-1"
                    placeholder="Enter account name"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={payoutDetails.accountNumber}
                    onChange={(e) => setPayoutDetails({...payoutDetails, accountNumber: e.target.value})}
                    className="mt-1"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    value={payoutDetails.routingNumber}
                    onChange={(e) => setPayoutDetails({...payoutDetails, routingNumber: e.target.value})}
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
                  placeholder="Enter wallet address"
                  className="mt-1"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handlePayoutRequest}
              disabled={!payoutAmount || parseFloat(payoutAmount) <= 0 || parseFloat(payoutAmount) > earnings.available}
            >
              Request Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorPayouts;
