
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { useCreatorAnalytics } from "@/hooks/useCreatorAnalytics";
import { AnalyticsHeader, AnalyticsStats, AnalyticsCharts, AnalyticsSummary } from "./analytics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, ThumbsUp, Share2, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CreatorAnalyticsProps {
  creatorId: string;
}

const CreatorAnalytics = ({ creatorId }: CreatorAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState<string>("7days");
  
  // Convert timeRange to period format expected by the hook
  const periodMap: Record<string, 'week' | 'month' | 'year'> = {
    "7days": "week",
    "30days": "month",
    "90days": "year"
  };
  
  const { analytics, summary, loading, error } = useCreatorAnalytics(
    periodMap[timeRange] || "week"
  );
  
  const [statsData, setStatsData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && analytics.length > 0) {
      // Process analytics data for charts
      const formattedData = analytics.map((item: any) => ({
        date: format(new Date(item.date), 'MMM dd'),
        views: item.views,
        likes: item.likes,
        shares: item.shares,
        earnings: parseFloat(item.earnings)
      }));
      
      setChartData(formattedData);
      
      // Calculate percent changes for stats
      const previousPeriodData = getPreviousPeriodSummary();
      
      // Create stats data for display
      setStatsData([
        {
          title: "Total Views",
          value: summary.views.toLocaleString(),
          change: getPercentChange(summary.views, previousPeriodData.views),
          icon: <Eye className="h-4 w-4" />,
          trend: summary.views >= previousPeriodData.views ? "up" : "down"
        },
        {
          title: "Total Likes",
          value: summary.likes.toLocaleString(),
          change: getPercentChange(summary.likes, previousPeriodData.likes),
          icon: <ThumbsUp className="h-4 w-4" />,
          trend: summary.likes >= previousPeriodData.likes ? "up" : "down"
        },
        {
          title: "Total Shares",
          value: summary.shares.toLocaleString(),
          change: getPercentChange(summary.shares, previousPeriodData.shares),
          icon: <Share2 className="h-4 w-4" />,
          trend: summary.shares >= previousPeriodData.shares ? "up" : "down"
        },
        {
          title: "Total Earnings",
          value: `${summary.earnings.toFixed(2)} LC`,
          change: getPercentChange(summary.earnings, previousPeriodData.earnings),
          icon: <DollarSign className="h-4 w-4" />,
          trend: summary.earnings >= previousPeriodData.earnings ? "up" : "down"
        }
      ]);
    }
  }, [analytics, summary, loading]);

  // Helper function to calculate previous period summary
  const getPreviousPeriodSummary = () => {
    // In real implementation, we would fetch the previous period data
    // For now, just use approximately 90% of current values for demonstration
    return {
      views: Math.floor(summary.views * 0.9),
      likes: Math.floor(summary.likes * 0.9),
      shares: Math.floor(summary.shares * 0.9),
      earnings: summary.earnings * 0.9
    };
  };

  // Helper function to calculate percent change
  const getPercentChange = (current: number, previous: number) => {
    if (previous === 0) return "+100%";
    const change = ((current - previous) / previous) * 100;
    const prefix = change >= 0 ? "+" : "";
    return `${prefix}${change.toFixed(1)}%`;
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load analytics data: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <AnalyticsHeader timeRange={timeRange} setTimeRange={setTimeRange} />
      
      {/* Analytics Summary Cards */}
      <AnalyticsSummary 
        views={summary.views}
        likes={summary.likes}
        shares={summary.shares}
        earnings={summary.earnings}
        loading={loading}
      />
      
      {/* Analytics Stats */}
      <AnalyticsStats statsData={statsData} isLoading={loading} />
      
      {/* Analytics Charts */}
      <AnalyticsCharts chartData={chartData} isLoading={loading} />
    </div>
  );
};

export default CreatorAnalytics;
