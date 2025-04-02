
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Loader2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  transaction_type: string;
  description: string;
  created_at: string;
  blockchain_tx_hash?: string;
}

interface TransactionHistoryProps {
  className?: string;
}

export default function TransactionHistory({ className = '' }: TransactionHistoryProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['transactions', page, pageSize],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('wallet-api/history', {
        body: { page, pageSize },
      });
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getTransactionIcon = (type: string) => {
    if (type === 'recharge' || type === 'mint') {
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    }
    return <ArrowUpRight className="h-4 w-4 text-red-500" />;
  };

  const formatAmount = (amount: number) => {
    return (
      <span className={amount >= 0 ? 'text-green-600' : 'text-red-600'}>
        {amount > 0 ? '+' : ''}{amount}
      </span>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent Lucoin transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            Failed to load transactions. Please try again.
          </div>
        ) : data?.transactions?.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No transactions found.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.transactions?.map((tx: Transaction) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {getTransactionIcon(tx.transaction_type)}
                        <span className="ml-2 capitalize">
                          {tx.transaction_type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[180px] truncate">
                      {tx.description || 'N/A'}
                      {tx.blockchain_tx_hash && (
                        <a
                          href={`https://explorer.solana.com/tx/${tx.blockchain_tx_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:underline inline-flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                    </TableCell>
                    <TableCell>{formatAmount(tx.amount)}</TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {formatTimestamp(tx.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={page === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                      className={page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
