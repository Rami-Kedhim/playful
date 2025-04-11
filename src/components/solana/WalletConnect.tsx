
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSolanaWallet } from '@/hooks/useSolanaWallet';
import { ExternalLink, Loader2, LogOut, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const WalletConnect = () => {
  const { walletAddress, isConnected, isConnecting, connectWallet, disconnectWallet } = useSolanaWallet();
  const [isHovered, setIsHovered] = useState(false);

  // Format address for display
  const displayAddress = walletAddress && !isHovered 
    ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}` 
    : walletAddress;

  // Handle connection
  const handleConnect = () => {
    connectWallet();
  };

  // Format address for explorer URL
  const getExplorerUrl = (address: string) => {
    return `https://explorer.iota.org/mainnet/addr/${address}`;
  };

  return (
    <>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="font-mono"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Shield className="mr-2 h-4 w-4" />
              {displayAddress}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => window.open(getExplorerUrl(walletAddress!), '_blank')}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Explorer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet}>
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleConnect} 
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      )}
    </>
  );
};

export default WalletConnect;
