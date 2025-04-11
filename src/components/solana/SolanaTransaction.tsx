
import React from 'react';
import { ExternalLink, Check, AlertTriangle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface SolanaTransactionProps {
  signature: string;
  amount?: number;
  timestamp: Date | string;
  status: 'confirmed' | 'pending' | 'failed';
  type: 'incoming' | 'outgoing';
  description?: string;
}

const SolanaTransaction: React.FC<SolanaTransactionProps> = ({
  signature,
  amount,
  timestamp,
  status,
  type,
  description
}) => {
  const getExplorerUrl = (txSignature: string) => {
    return `https://explorer.solana.com/tx/${txSignature}`;
  };
  
  const getStatusIcon = () => {
    if (status === 'confirmed') return <Check className="h-4 w-4 text-green-500" />;
    if (status === 'pending') return <Clock className="h-4 w-4 text-amber-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };
  
  const formattedTimestamp = typeof timestamp === 'string' 
    ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    : formatDistanceToNow(timestamp, { addSuffix: true });

  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-medium">{description || (type === 'incoming' ? 'Received SOL' : 'Sent SOL')}</span>
          {getStatusIcon()}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {formattedTimestamp}
        </div>
        <a 
          href={getExplorerUrl(signature)} 
          target="_blank"
          rel="noopener noreferrer" 
          className="text-xs text-primary hover:underline flex items-center mt-1"
        >
          <span className="truncate max-w-[120px]">{signature.slice(0, 8)}...{signature.slice(-8)}</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
      <div className={cn(
        "font-medium",
        type === 'incoming' ? 'text-green-500' : 'text-red-500'
      )}>
        {type === 'incoming' ? '+' : '-'}{amount?.toFixed(4) || '–'} SOL
      </div>
    </div>
  );
};

export default SolanaTransaction;
