
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, ChevronRight, RefreshCw, History } from "lucide-react";
import { useUBX } from "@/hooks/useUBX";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface UBXWalletProps {
  compact?: boolean;
  showRefresh?: boolean;
  showHistory?: boolean;
}

export const UBXWallet: React.FC<UBXWalletProps> = ({
  compact = false,
  showRefresh = true,
  showHistory = true
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { balance, isProcessing, refreshBalance } = useUBX();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user?.id) {
      loadUBXData();
    }
  }, [user?.id]);
  
  const loadUBXData = async () => {
    setLoading(true);
    try {
      await refreshBalance();
    } catch (error) {
      console.error("Error loading UBX data:", error);
      toast({
        title: "Failed to load UBX data",
        description: "Could not retrieve your current UBX balance",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="px-2 py-1 bg-primary/10">
          <Coins className="h-3 w-3 mr-1 text-primary" />
          <span>{loading ? "..." : balance} UBX</span>
        </Badge>
        {showRefresh && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={loadUBXData}
            disabled={loading || isProcessing}
          >
            <RefreshCw className={`h-3 w-3 ${loading || isProcessing ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Coins className="h-5 w-5 text-primary mr-2" />
          UBX Balance
        </CardTitle>
        {showRefresh && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={loadUBXData}
            disabled={loading || isProcessing}
          >
            <RefreshCw className={`h-4 w-4 ${loading || isProcessing ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold">{balance} UBX</div>
            
            {showHistory && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                asChild
              >
                <Link to="/wallet">
                  <History className="h-4 w-4 mr-2" />
                  Transaction History
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UBXWallet;
