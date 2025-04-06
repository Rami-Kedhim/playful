
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const WalletConnect = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  const connectWallet = async () => {
    try {
      setConnecting(true);
      
      // This would integrate with Solana wallet adapter in a real app
      // For now, simulate a wallet connection after a delay
      setTimeout(() => {
        // Generate a mock wallet address
        const mockAddress = "8xJBr..." + Math.random().toString(16).slice(2, 6);
        setWalletAddress(mockAddress);
        setConnected(true);
        setConnecting(false);
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${mockAddress}`,
        });
      }, 1500);
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Could not connect to wallet",
        variant: "destructive",
      });
      setConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    setWalletAddress(null);
    setConnected(false);
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };
  
  return (
    <Button
      variant={connected ? "outline" : "default"}
      onClick={connected ? disconnectWallet : connectWallet}
      disabled={connecting}
    >
      {connecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : connected ? (
        "Disconnect"
      ) : (
        "Connect"
      )}
    </Button>
  );
};

export default WalletConnect;
