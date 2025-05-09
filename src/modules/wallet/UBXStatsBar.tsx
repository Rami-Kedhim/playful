
import React from 'react';
import { formatNumber } from '@/utils/formatters';

export const UBXStatsBar: React.FC = () => {
  // In a real app, these would come from an API or context
  const stats = {
    totalTransactions: 2543897,
    activeUsers: 128764,
    marketCap: 153000000,
    ubxPrice: 1.23
  };
  
  return (
    <div className="bg-background border-y">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-center md:justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-xs text-muted-foreground block">UBX PRICE</span>
            <span className="font-semibold">${stats.ubxPrice.toFixed(2)} USD</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-muted-foreground block">MARKET CAP</span>
            <span className="font-semibold">${formatNumber(stats.marketCap)}</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-muted-foreground block">TOTAL TRANSACTIONS</span>
            <span className="font-semibold">{formatNumber(stats.totalTransactions)}</span>
          </div>
          <div className="text-center md:text-right">
            <span className="text-xs text-muted-foreground block">ACTIVE USERS</span>
            <span className="font-semibold">{formatNumber(stats.activeUsers)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
