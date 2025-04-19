
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
  
  const periodMap: Record<string, 'week' | 'month' | 'year'> = {
    "7days": "week",
    "30days": "month",
    "90days": "year"
  };
  
  const { analytics, loading, totalValue: summary } = useCreatorAnalytics(
    periodMap[timeRange] || "week"
  );
  
  const [statsData, setStatsData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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
          value: summary,
          change: getPercentChange(summary, previousPeriodData.views),
          icon: <Eye className="h-4 w-4" />,
          trend: summary >= previousPeriodData.views ? "up" : "down"
        },
        {
          title: "Total Likes",
          value: summary,
          change: getPercentChange(summary, previousPeriodData.likes),
          icon: <ThumbsUp className="h-4 w-4" />,
          trend: summary >= previousPeriodData.likes ? "up" : "down"
        },
        {
          title: "Total Shares",
          value: summary,
          change: getPercentChange(summary, previousPeriodData.shares),
          icon: <Share2 className="h-4 w-4" />,
          trend: summary >= previousPeriodData.shares ? "up" : "down"
        },
        {
          title: "Total Earnings",
          value: `${summary.toFixed(2)} LC`,
          change: getPercentChange(summary, previousPeriodData.earnings),
          icon: <DollarSign className="h-4 w-4" />,
          trend: summary >= previousPeriodData.earnings ? "up" : "down"
        }
      ]);
    }
  }, [analytics, summary, loading]);

  // Helpers
  const getPreviousPeriodSummary = () => {
    return {
      views: Math.floor(summary * 0.9),
      likes: Math.floor(summary * 0.9),
      shares: Math.floor(summary * 0.9),
      earnings: summary * 0.9
    };
  };

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
      
      <AnalyticsSummary 
        views={summary}
        likes={summary}
        shares={summary}
        earnings={summary}
        loading={loading}
      />
      
      <AnalyticsStats statsData={statsData} isLoading={loading} />
      
      <AnalyticsCharts chartData={chartData} isLoading={loading} />
    </div>
  );
};

export default CreatorAnalytics;

