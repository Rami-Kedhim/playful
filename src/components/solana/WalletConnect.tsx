
import { Button } from "@/components/ui/button";
import { Wallet, RefreshCw } from "lucide-react";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { truncateMiddle } from "@/utils/stringUtils";

interface WalletConnectProps {
  className?: string;
  size?: "sm" | "default";
}

const WalletConnect = ({ className, size = "default" }: WalletConnectProps) => {
  const { 
    walletAddress, 
    connecting, 
    disconnecting, 
    connectWallet, 
    disconnectWallet, 
    hasWallet 
  } = useSolanaWallet();

  if (!hasWallet) {
    return (
      <Button
        variant="outline"
        onClick={() => window.open('https://chainstack.com/build-better-with-solana/', '_blank')}
        className={className}
        size={size}
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect with Chainstack
      </Button>
    );
  }

  if (connecting || disconnecting) {
    return (
      <Button disabled className={className} size={size}>
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        {connecting ? "Connecting..." : "Disconnecting..."}
      </Button>
    );
  }

  if (walletAddress) {
    return (
      <Button
        variant="outline"
        onClick={disconnectWallet}
        className={className}
        size={size}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {truncateMiddle(walletAddress, 4, 4)}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={connectWallet}
      className={className}
      size={size}
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
