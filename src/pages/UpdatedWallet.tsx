import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Wallet, CreditCard, ArrowRightLeft, Clock, Landmark, Plus, ArrowUp, ChevronsUp, User, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const UpdatedWallet = () => {
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("wallet");
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const isBoosted = profile?.is_boosted || profile?.isBoosted || false;

  return (
    <MainLayout>
      <div className="container max-w-5xl py-6 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wallet & Subscriptions</h1>
            <p className="text-muted-foreground">Manage your currency, boosts, and subscriptions</p>
          </div>
          
          <Button onClick={() => setIsRechargeOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Recharge Credits
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wallet">
              <Wallet className="h-4 w-4 mr-2" /> Wallet
            </TabsTrigger>
            <TabsTrigger value="subscriptions">
              <CreditCard className="h-4 w-4 mr-2" /> Subscriptions
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <ArrowRightLeft className="h-4 w-4 mr-2" /> Transactions
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6 grid gap-6">
            {/* Wallet Overview */}
            <TabsContent value="wallet">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <ChevronsUp className="h-4 w-4 mr-2 text-emerald-500" />
                      UBX Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{profile?.ubx_balance || 0}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Available for premium features
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => setIsRechargeOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Add Credits
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Award className="h-4 w-4 mr-2 text-amber-500" />
                      Boost Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-xl font-semibold ${isBoosted ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                      {isBoosted ? 'Active' : 'Inactive'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isBoosted 
                        ? 'Your profile is currently boosted' 
                        : 'Boost your profile for more visibility'}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant={isBoosted ? "outline" : "default"} className="w-full">
                      {isBoosted ? 'Manage Boost' : 'Get Boosted'}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-500" />
                      Membership
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-semibold capitalize">
                      {profile?.subscription_tier || 'Free'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {profile?.subscription_tier !== 'premium' 
                        ? 'Upgrade to Premium for exclusive features' 
                        : 'You have access to all premium features'}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant={profile?.subscription_tier === 'premium' ? "outline" : "default"} className="w-full">
                      {profile?.subscription_tier === 'premium' ? 'Manage Plan' : 'Upgrade'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Recent transactions preview */}
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your recent financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Transaction history would go here */}
                  <div className="text-center text-muted-foreground py-6">
                    No recent transactions
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("transactions")}>
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Rest of tab content */}
            <TabsContent value="subscriptions">
              {/* Subscription content */}
            </TabsContent>
            
            <TabsContent value="transactions">
              {/* Transactions content */}
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Recharge Dialog */}
        <Dialog open={isRechargeOpen} onOpenChange={setIsRechargeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Recharge UBX Credits</DialogTitle>
              <DialogDescription>
                Purchase UBX credits to unlock premium features and content.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              {[10, 20, 50, 100].map(amount => (
                <Button 
                  key={amount} 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => {
                    toast({ title: "Coming soon", description: "This feature is not yet implemented" });
                  }}
                >
                  <span className="text-xl font-bold">{amount}</span>
                  <span className="text-xs text-muted-foreground">UBX</span>
                </Button>
              ))}
            </div>
            
            <Separator className="my-2" />
            
            <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
              <Button variant="outline" onClick={() => setIsRechargeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({ title: "Coming soon", description: "This feature is not yet implemented" });
                setIsRechargeOpen(false);
              }}>
                Continue to Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default UpdatedWallet;
