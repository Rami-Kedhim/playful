
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVerificationAnalytics = () => {
  return useQuery({
    queryKey: ['verification-analytics'],
    queryFn: async () => {
      const { data: pendingCount } = await supabase
        .from('verification_requests')
        .select('count', { count: 'exact' })
        .eq('status', 'pending');

      const { data: approvedCount } = await supabase
        .from('verification_requests')
        .select('count', { count: 'exact' })
        .eq('status', 'approved');
      
      const { data: averageTime } = await supabase
        .from('verification_requests')
        .select('reviewed_at, created_at')
        .not('reviewed_at', 'is', null)
        .limit(100);

      // Calculate average review time in hours
      const avgReviewTime = averageTime?.reduce((acc, req) => {
        const reviewTime = new Date(req.reviewed_at).getTime() - new Date(req.created_at).getTime();
        return acc + reviewTime / (1000 * 60 * 60); // Convert to hours
      }, 0) / (averageTime?.length || 1);

      return {
        pendingRequests: pendingCount || 0,
        approvedRequests: approvedCount || 0,
        averageReviewTime: Math.round(avgReviewTime || 0),
      };
    },
  });
};
