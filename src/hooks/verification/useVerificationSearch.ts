
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useVerificationSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  const { data: requests, isLoading } = useQuery({
    queryKey: ['verification-requests', searchQuery, statusFilter, levelFilter, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('search_verification_requests', {
        search_query: searchQuery || null,
        status_filter: statusFilter || null,
        level_filter: levelFilter || null,
        start_date: dateRange.from?.toISOString() || null,
        end_date: dateRange.to?.toISOString() || null
      });

      if (error) throw error;
      return data;
    },
  });

  return {
    requests,
    isLoading,
    setSearchQuery,
    setStatusFilter,
    setLevelFilter,
    setDateRange,
  };
}
