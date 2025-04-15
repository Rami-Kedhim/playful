
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVerificationAnalytics = () => {
  return useQuery({
    queryKey: ['verification-analytics'],
    queryFn: async () => {
      // Query for pending count
      const { data: pendingData, error: pendingError } = await supabase
        .from('verification_requests')
        .select('count', { count: 'exact' })
        .eq('status', 'pending');
        
      if (pendingError) throw pendingError;
      const pendingCount = pendingData || 0;

      // Query for approved count
      const { data: approvedData, error: approvedError } = await supabase
        .from('verification_requests')
        .select('count', { count: 'exact' })
        .eq('status', 'approved');
      
      if (approvedError) throw approvedError;
      const approvedCount = approvedData || 0;
      
      // Query for average review time
      const { data: averageTime, error: avgTimeError } = await supabase
        .from('verification_requests')
        .select('reviewed_at, created_at')
        .not('reviewed_at', 'is', null)
        .limit(100);

      if (avgTimeError) throw avgTimeError;
      
      // Calculate average review time in hours
      let avgReviewTime = 0;
      if (averageTime && averageTime.length > 0) {
        const totalHours = averageTime.reduce((acc, req) => {
          const reviewTime = new Date(req.reviewed_at).getTime() - new Date(req.created_at).getTime();
          return acc + reviewTime / (1000 * 60 * 60); // Convert to hours
        }, 0);
        avgReviewTime = Math.round(totalHours / averageTime.length);
      }

      return {
        pendingRequests: typeof pendingCount === 'number' ? pendingCount : 0,
        approvedRequests: typeof approvedCount === 'number' ? approvedCount : 0,
        averageReviewTime: avgReviewTime,
      };
    },
  });
};
