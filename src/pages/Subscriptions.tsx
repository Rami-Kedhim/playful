
import React, { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SubscriptionCard from "@/components/subscription/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Subscriptions = () => {
  const { 
    subscriptions, 
    isLoading, 
    error, 
    updateAutoRenew, 
    unsubscribe 
  } = useSubscription();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<string | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAutoRenewToggle = async (id: string, autoRenew: boolean) => {
    await updateAutoRenew(id, autoRenew);
  };
  
  const handleCancelClick = (id: string) => {
    setSubscriptionToCancel(id);
    setCancelDialogOpen(true);
  };
  
  const handleConfirmCancel = async () => {
    if (subscriptionToCancel) {
      await unsubscribe(subscriptionToCancel);
      setCancelDialogOpen(false);
      setSubscriptionToCancel(null);
    }
  };
  
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.creatorUsername.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTab = 
      (activeTab === "active" && sub.isActive) ||
      (activeTab === "canceled" && !sub.isActive) ||
      activeTab === "all";
      
    return matchesSearch && matchesTab;
  });
  
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold">My Subscriptions</h1>
                <p className="text-muted-foreground">
                  Manage your creator subscriptions
                </p>
              </div>
              
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search creators" 
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 w-full md:w-[250px]"
                />
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : filteredSubscriptions.length > 0 ? (
                  <div className="space-y-6">
                    {filteredSubscriptions.map(subscription => (
                      <SubscriptionCard
                        key={subscription.id}
                        subscription={subscription}
                        onRenewToggle={handleAutoRenewToggle}
                        onCancel={handleCancelClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-lg font-semibold mb-2">No subscriptions found</h3>
                    {activeTab === "active" ? (
                      <p className="text-muted-foreground">
                        You don't have any active subscriptions.
                        <br />
                        Subscribe to creators to access their exclusive content.
                      </p>
                    ) : activeTab === "canceled" ? (
                      <p className="text-muted-foreground">
                        You don't have any canceled subscriptions.
                      </p>
                    ) : (
                      <p className="text-muted-foreground">
                        You haven't subscribed to any creators yet.
                      </p>
                    )}
                    
                    <Button className="mt-4" asChild>
                      <a href="/creators">Browse Creators</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <AlertDialog 
          open={cancelDialogOpen} 
          onOpenChange={setCancelDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this subscription? You will still have access until the current period ends.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmCancel}>
                Yes, Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Subscriptions;
