
import { SolanaProvider } from "@/types/solana";

/**
 * Detects and returns the available Solana wallet provider
 */
export const getWalletProvider = (): SolanaProvider | null => {
  if ('chainstack' in window && window.chainstack?.solana) {
    const provider = window.chainstack.solana;
    if (provider.isConnected) {
      return provider;
    }
  }

  // Fallback for other Solana wallets
  if ('solana' in window) {
    const provider = window.solana;
    if (provider?.isConnected) {
      return provider;
    }
  }
  
  return null;
};
