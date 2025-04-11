
// Define types for Solana wallet providers based on their API
export interface SolanaProvider {
  isConnected: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: () => void) => void;
  publicKey: { toString: () => string } | null;
  removeAllListeners?: () => void;
}

// Chainstack connection type
export interface ChainstackConnection {
  rpcUrl: string;
  authenticate: () => Promise<void>;
  isAuthenticated: boolean;
}

declare global {
  interface Window {
    chainstack?: {
      solana?: SolanaProvider;
      connection?: ChainstackConnection;
    };
    solana?: SolanaProvider;
  }
}

export interface WalletState {
  provider: SolanaProvider | null;
  walletAddress: string | null;
  connecting: boolean;
  disconnecting: boolean;
}

export interface WalletHookReturn extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  hasWallet: boolean;
  isConnected: boolean;
  isConnecting: boolean; // Add this missing property
}
