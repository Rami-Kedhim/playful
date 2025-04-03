
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { logContentAction } from "@/utils/debugUtils";

export interface Subscription {
  id: string;
  userId: string;
  creatorId: string;
  creatorName: string;
  creatorUsername: string;
  plan: "basic" | "premium" | "vip";
  price: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  isLoading: boolean;
  error: string | null;
  subscribe: (creatorId: string, plan: "basic" | "premium" | "vip") => Promise<boolean>;
  unsubscribe: (subscriptionId: string) => Promise<boolean>;
  updateAutoRenew: (subscriptionId: string, autoRenew: boolean) => Promise<boolean>;
  isSubscribed: (creatorId: string) => boolean;
  getSubscription: (creatorId: string) => Subscription | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch user subscriptions when user changes
  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!isAuthenticated || !user) {
        setSubscriptions([]);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would fetch from your API
        // For now, we'll simulate with localStorage
        const savedSubscriptions = localStorage.getItem(`subscriptions_${user.id}`);
        
        if (savedSubscriptions) {
          setSubscriptions(JSON.parse(savedSubscriptions));
          logContentAction('Loaded user subscriptions', { userId: user.id, count: JSON.parse(savedSubscriptions).length });
        } else {
          setSubscriptions([]);
        }
      } catch (error: any) {
        console.error("Failed to fetch subscriptions:", error);
        setError("Failed to load your subscriptions");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubscriptions();
  }, [user, isAuthenticated]);
  
  // Save subscriptions to localStorage whenever they change
  useEffect(() => {
    if (user && subscriptions.length > 0) {
      localStorage.setItem(`subscriptions_${user.id}`, JSON.stringify(subscriptions));
    }
  }, [subscriptions, user]);
  
  const isSubscribed = (creatorId: string): boolean => {
    if (!user) return false;
    
    return subscriptions.some(
      sub => sub.creatorId === creatorId && sub.isActive
    );
  };
  
  const getSubscription = (creatorId: string): Subscription | null => {
    if (!user) return null;
    
    const subscription = subscriptions.find(
      sub => sub.creatorId === creatorId && sub.isActive
    );
    
    return subscription || null;
  };
  
  const subscribe = async (creatorId: string, plan: "basic" | "premium" | "vip"): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe",
        variant: "destructive",
      });
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if already subscribed
      if (isSubscribed(creatorId)) {
        toast({
          title: "Already subscribed",
          description: "You are already subscribed to this creator",
        });
        return true;
      }
      
      // Mock prices for different plans
      const prices = {
        basic: 9.99,
        premium: 19.99,
        vip: 49.99
      };
      
      // Mock creator data - in a real app, you would fetch this
      const mockCreators = [
        { id: "creator1", name: "Crystal", username: "crystal_dreams" },
        { id: "creator2", name: "Luna", username: "luna_fantasy" },
        { id: "creator3", name: "Emma", username: "emma_love" }
      ];
      
      const creator = mockCreators.find(c => c.id === creatorId);
      
      if (!creator) {
        throw new Error("Creator not found");
      }
      
      // Create a new subscription
      const now = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription
      
      const newSubscription: Subscription = {
        id: `sub_${Date.now()}`,
        userId: user.id,
        creatorId: creatorId,
        creatorName: creator.name,
        creatorUsername: creator.username,
        plan: plan,
        price: prices[plan],
        startDate: now.toISOString(),
        endDate: endDate.toISOString(),
        isActive: true,
        autoRenew: true
      };
      
      // In a real app, you would make an API call to process payment
      // and create the subscription on the server
      
      // Update local state
      setSubscriptions(prev => [...prev, newSubscription]);
      
      toast({
        title: "Subscription successful",
        description: `You are now subscribed to ${creator.name}`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Subscription failed:", error);
      setError(error.message || "Failed to subscribe");
      
      toast({
        title: "Subscription failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const unsubscribe = async (subscriptionId: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const subscription = subscriptions.find(sub => sub.id === subscriptionId);
      
      if (!subscription) {
        throw new Error("Subscription not found");
      }
      
      // In a real app, this would be an API call to cancel the subscription
      
      // Update local state
      const updatedSubscriptions = subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, isActive: false, autoRenew: false } : sub
      );
      
      setSubscriptions(updatedSubscriptions);
      
      toast({
        title: "Unsubscribed",
        description: `You have unsubscribed from ${subscription.creatorName}`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Failed to unsubscribe:", error);
      setError(error.message || "Failed to unsubscribe");
      
      toast({
        title: "Unsubscribe failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateAutoRenew = async (subscriptionId: string, autoRenew: boolean): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      
      // Update local state
      const updatedSubscriptions = subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, autoRenew } : sub
      );
      
      setSubscriptions(updatedSubscriptions);
      
      toast({
        title: "Auto-renew updated",
        description: `Auto-renew has been ${autoRenew ? 'enabled' : 'disabled'}`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Failed to update auto-renew:", error);
      setError(error.message || "Failed to update auto-renew settings");
      
      toast({
        title: "Update failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        isLoading,
        error,
        subscribe,
        unsubscribe,
        updateAutoRenew,
        isSubscribed,
        getSubscription
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

export default useSubscription;
