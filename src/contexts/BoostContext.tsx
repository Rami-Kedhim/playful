
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BoostStatus, BoostPackage } from '@/types/boost';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';
import { calculateRemainingTime } from '@/utils/boostCalculator';

// Define the context interface
interface BoostContextType {
  boostStatus: BoostStatus;
  isLoading: boolean;
  error: string | null;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  purchaseBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  boostAnalytics: AnalyticsData | null;
  fetchAnalytics: () => Promise<AnalyticsData | null>;
}

// Create context with default values
const BoostContext = createContext<BoostContextType | undefined>(undefined);

// Provider component
interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider = ({ children }: BoostProviderProps) => {
  const { user } = useAuth();
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    progress: 0,
    remainingTime: ''
  });
  const [boostAnalytics, setBoostAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);
  const DAILY_BOOST_LIMIT = 4;

  // Check for active boost when user changes
  useEffect(() => {
    if (user?.id) {
      checkActiveBoost();
    } else {
      // Reset state when no user is logged in
      setBoostStatus({
        isActive: false,
        progress: 0,
        remainingTime: ''
      });
    }
  }, [user?.id]);

  // Update boost progress and remaining time for active boosts
  useEffect(() => {
    if (!boostStatus.isActive || !boostStatus.expiresAt) return;

    const timer = setInterval(() => {
      if (boostStatus.expiresAt) {
        // Calculate new remaining time
        const remainingTime = calculateRemainingTime(boostStatus.expiresAt);
        
        // Calculate progress (0-100%)
        const now = new Date();
        const expiresAt = new Date(boostStatus.expiresAt);
        const totalDuration = boostStatus.boostPackage?.duration 
          ? durationToMilliseconds(boostStatus.boostPackage.duration) 
          : 3 * 60 * 60 * 1000; // Default 3 hours
        
        const timeLeft = expiresAt.getTime() - now.getTime();
        const elapsed = totalDuration - timeLeft;
        const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        
        // Check if boost has expired
        if (timeLeft <= 0) {
          setBoostStatus({
            isActive: false,
            progress: 0,
            remainingTime: ''
          });
          toast({
            title: "Boost Expired",
            description: "Your profile boost has ended"
          });
        } else {
          // Update with new values
          setBoostStatus(prev => ({
            ...prev,
            remainingTime,
            progress
          }));
        }
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [boostStatus.isActive, boostStatus.expiresAt]);

  // Convert duration string (HH:MM:SS) to milliseconds
  const durationToMilliseconds = (duration: string): number => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
  };

  // Check if user has an active boost
  const checkActiveBoost = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call - In a real implementation, this would fetch from backend
      const hasActiveBoost = Math.random() > 0.6;
      
      if (hasActiveBoost) {
        // Mock active boost data
        const duration = "03:00:00"; // 3 hours
        const endDate = new Date(Date.now() + durationToMilliseconds(duration));
        
        const mockPackage: BoostPackage = {
          id: "boost-standard",
          name: "3-Hour Boost",
          duration,
          price_lucoin: 15,
          description: "Standard visibility boost package"
        };
        
        setBoostStatus({
          isActive: true,
          expiresAt: endDate,
          boostPackage: mockPackage,
          remainingTime: calculateRemainingTime(endDate),
          progress: 10 // Just started
        });
        
        // Also fetch daily usage
        setDailyBoostUsage(Math.floor(Math.random() * 3) + 1); // 1-3 boosts used
      } else {
        setBoostStatus({
          isActive: false,
          progress: 0,
          remainingTime: ''
        });
        setDailyBoostUsage(0);
      }
    } catch (err) {
      console.error("Error checking active boost:", err);
      setError("Failed to check boost status");
    } finally {
      setIsLoading(false);
    }
  };

  // Purchase a boost package
  const purchaseBoost = async (packageId: string): Promise<boolean> => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase a boost",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // Find the selected package
      // In a real app, this would be fetched from API
      const packages = [
        {
          id: "boost-1",
          name: "1-Hour Boost",
          duration: "01:00:00",
          price_ubx: 5,
          description: "Quick visibility boost"
        },
        {
          id: "boost-3",
          name: "3-Hour Boost",
          duration: "03:00:00",
          price_ubx: 15,
          description: "Standard visibility boost"
        },
        {
          id: "boost-24",
          name: "24-Hour Boost",
          duration: "24:00:00",
          price_ubx: 50,
          description: "Full day visibility boost"
        }
      ];
      
      const selectedPackage = packages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) {
        toast({
          title: "Package not found",
          description: "The selected boost package could not be found",
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate purchase delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate expiry time based on package duration
      const duration = selectedPackage.duration;
      const expiresAt = new Date(Date.now() + durationToMilliseconds(duration));
      
      // Update boost status
      setBoostStatus({
        isActive: true,
        expiresAt,
        boostPackage: selectedPackage,
        remainingTime: calculateRemainingTime(expiresAt),
        progress: 0
      });
      
      // Update daily usage
      setDailyBoostUsage(prev => prev + 1);
      
      toast({
        title: "Boost Activated",
        description: `Your profile has been boosted for ${formatDuration(duration)}`
      });
      
      return true;
    } catch (err) {
      console.error("Error purchasing boost:", err);
      setError("Failed to purchase boost");
      
      toast({
        title: "Purchase Failed",
        description: "There was a problem activating your boost",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel an active boost
  const cancelBoost = async (): Promise<boolean> => {
    if (!user?.id || !boostStatus.isActive) {
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update boost status
      setBoostStatus({
        isActive: false,
        progress: 0,
        remainingTime: ''
      });
      
      toast({
        title: "Boost Cancelled",
        description: "Your profile boost has been cancelled"
      });
      
      return true;
    } catch (err) {
      console.error("Error cancelling boost:", err);
      setError("Failed to cancel boost");
      
      toast({
        title: "Error",
        description: "Failed to cancel boost",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Format duration string for display
  const formatDuration = (durationStr: string): string => {
    const [hours, minutes] = durationStr.split(':');
    if (parseInt(hours) > 0) {
      return `${parseInt(hours)} hour${parseInt(hours) > 1 ? 's' : ''}`;
    }
    return `${parseInt(minutes)} minutes`;
  };

  // Fetch analytics data for current boost
  const fetchAnalytics = async (): Promise<AnalyticsData | null> => {
    if (!boostStatus.isActive) return null;
    
    try {
      setIsLoading(true);
      
      // Mock analytics data
      const mockAnalytics: AnalyticsData = {
        additionalViews: Math.floor(Math.random() * 50) + 20,
        engagementIncrease: Math.floor(Math.random() * 30) + 10,
        rankingPosition: Math.floor(Math.random() * 5) + 1,
        effectiveness: Math.floor(Math.random() * 30) + 70,
        views: {
          withoutBoost: Math.floor(Math.random() * 100) + 50,
          withBoost: Math.floor(Math.random() * 200) + 150,
          increase: Math.floor(Math.random() * 30) + 20
        },
        clicks: {
          withoutBoost: Math.floor(Math.random() * 30) + 10,
          withBoost: Math.floor(Math.random() * 70) + 30,
          increase: Math.floor(Math.random() * 50) + 30
        },
        searchRanking: {
          withoutBoost: Math.floor(Math.random() * 15) + 8,
          withBoost: Math.floor(Math.random() * 5) + 1,
          improvement: Math.floor(Math.random() * 7) + 3
        }
      };
      
      setBoostAnalytics(mockAnalytics);
      return mockAnalytics;
    } catch (err) {
      console.error("Error fetching analytics:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    boostStatus,
    isLoading,
    error,
    dailyBoostUsage,
    dailyBoostLimit: DAILY_BOOST_LIMIT,
    purchaseBoost,
    cancelBoost,
    boostAnalytics,
    fetchAnalytics
  };

  return (
    <BoostContext.Provider value={value}>
      {children}
    </BoostContext.Provider>
  );
};

// Hook for using the boost context
export const useBoostContext = () => {
  const context = useContext(BoostContext);
  
  if (context === undefined) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  
  return context;
};
