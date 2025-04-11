
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getSolanaPrice } from '@/services/solanaService';

interface UBXBalanceProps {
  onRecharge?: () => void;
}

const UBXBalance: React.FC<UBXBalanceProps> = ({ onRecharge }) => {
  const { profile, refreshProfile } = useAuth();
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const balance = profile?.ubx_balance || 0;
  
  useEffect(() => {
    // Fetch the current price for UBX tokens
    const fetchPrice = async () => {
      try {
        // In reality, this would fetch the UBX price or calculate it
        // We'll use SOL price as a placeholder for now
        const solPrice = await getSolanaPrice();
        setPrice(solPrice / 10); // Placeholder: 1 UBX = 0.1 SOL value
      } catch (error) {
        console.error("Error fetching UBX price:", error);
      }
    };
    
    fetchPrice();
  }, []);

  const refreshBalance = async () => {
    setLoading(true);
    try {
      await refreshProfile();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Coins className="h-5 w-5 text-primary mr-2" />
          UBX Balance
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={refreshBalance} 
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold">{balance.toLocaleString()} UBX</div>
            <p className="text-sm text-muted-foreground mt-1">
              {price !== null ? (
                <>≈ ${(balance * price).toFixed(2)} USD</>
              ) : (
                '—'
              )}
            </p>
          </>
        )}
        
        {onRecharge && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRecharge} 
            className="w-full mt-4"
          >
            Add UBX Tokens
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default UBXBalance;
