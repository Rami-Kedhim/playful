
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, TrendingUp, Eye, MousePointerClick, Search } from "lucide-react";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics";

interface BoostAnalyticsCardProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
}

const BoostAnalyticsCard = ({ isActive, getAnalytics }: BoostAnalyticsCardProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAnalytics();
        if (data) {
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Error fetching boost analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isActive) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [isActive, getAnalytics]);

  if (!isActive) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Analytics</CardTitle>
          <CardDescription>
            Performance metrics for your profile boost
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No active boost detected. Analytics will be available when you have an active boost.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Analytics</CardTitle>
          <CardDescription>
            Loading your profile boost performance...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Analytics</CardTitle>
          <CardDescription>
            Performance metrics for your profile boost
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No analytics data available yet. Check back soon!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boost Analytics</CardTitle>
        <CardDescription>
          Key performance metrics for your profile boost
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
            <Eye className="h-5 w-5 mb-1 text-blue-500" />
            <span className="text-2xl font-bold">{analytics.additionalViews}</span>
            <span className="text-xs text-muted-foreground text-center">additional views</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
            <TrendingUp className="h-5 w-5 mb-1 text-green-500" />
            <span className="text-2xl font-bold">{analytics.engagementIncrease}%</span>
            <span className="text-xs text-muted-foreground text-center">engagement increase</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
            <Search className="h-5 w-5 mb-1 text-purple-500" />
            <span className="text-2xl font-bold">#{analytics.rankingPosition}</span>
            <span className="text-xs text-muted-foreground text-center">ranking position</span>
          </div>
        </div>

        {analytics.views && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Views</span>
              <span className="font-medium">
                {analytics.views.increase && `+${analytics.views.increase}%`}
              </span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        )}
        
        {analytics.clicks && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Clicks</span>
              <span className="font-medium">
                {analytics.clicks.increase && `+${analytics.clicks.increase}%`}
              </span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
