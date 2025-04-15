
import React from 'react';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const VerificationMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ['verification-metrics'],
    queryFn: async () => {
      const { data: pending } = await supabase
        .from('verification_requests')
        .select('count')
        .eq('status', 'pending')
        .single();

      const { data: approved } = await supabase
        .from('verification_requests')
        .select('count')
        .eq('status', 'approved')
        .single();

      const { data: rejected } = await supabase
        .from('verification_requests')
        .select('count')
        .eq('status', 'rejected')
        .single();

      return {
        pending: pending?.count || 0,
        approved: approved?.count || 0,
        rejected: rejected?.count || 0
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
          <p className="text-3xl font-bold text-orange-600">{metrics?.pending || 0}</p>
        </div>
      </Card>
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{metrics?.approved || 0}</p>
        </div>
      </Card>
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{metrics?.rejected || 0}</p>
        </div>
      </Card>
    </div>
  );
};

export default VerificationMetrics;
