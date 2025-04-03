
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { useCreatorAnalytics } from "@/hooks/useCreatorAnalytics";
import { 
  Eye, ThumbsUp, Share2, DollarSign
} from "lucide-react";
import { AnalyticsHeader, AnalyticsStats, AnalyticsCharts } from "./analytics";
import { Tabs } from "@/components/ui/tabs";

interface CreatorAnalyticsProps {
  creatorId: string;
}

const CreatorAnalytics = ({ creatorId }: CreatorAnalyticsProps) => {
  const [statsData, setStatsData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7days");
  const { analytics, summary, loading } = useCreatorAnalytics(
    timeRange === "7days" ? "week" : timeRange === "30days" ? "month" : "year"
  );

  useEffect(() => {
    if (creatorId) {
      loadAnalytics();
    }
  }, [creatorId, timeRange]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    
    const formattedData = analytics.map((item: any) => ({
      date: format(new Date(item.date), 'MMM dd'),
      views: item.views,
      likes: item.likes,
      shares: item.shares,
      earnings: parseFloat(item.earnings)
    }));
    
    setChartData(formattedData.reverse());
    
    setStatsData([
      {
        title: "Total Views",
        value: summary.views.toLocaleString(),
        change: "+10%",
        icon: <Eye className="h-4 w-4" />,
        trend: "up"
      },
      {
        title: "Total Likes",
        value: summary.likes.toLocaleString(),
        change: "+5%",
        icon: <ThumbsUp className="h-4 w-4" />,
        trend: "up"
      },
      {
        title: "Total Shares",
        value: summary.shares.toLocaleString(),
        change: "+12%",
        icon: <Share2 className="h-4 w-4" />,
        trend: "up"
      },
      {
        title: "Total Earnings",
        value: `$${summary.earnings.toFixed(2)}`,
        change: "+8%",
        icon: <DollarSign className="h-4 w-4" />,
        trend: "up"
      }
    ]);
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <AnalyticsHeader timeRange={timeRange} setTimeRange={setTimeRange} />
      <AnalyticsStats statsData={statsData} isLoading={isLoading || loading} />
      <AnalyticsCharts chartData={chartData} isLoading={isLoading || loading} />
    </div>
  );
};

export default CreatorAnalytics;
