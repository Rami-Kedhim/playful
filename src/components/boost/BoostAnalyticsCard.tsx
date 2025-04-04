
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, TrendingUp, Eye, MousePointerClick, Search } from "lucide-react";
import { BoostAnalytics } from "@/types/boost";
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
          Performance metrics for your profile boost
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span>Boost Effectiveness</span>
            <span className="font-medium">{analytics.effectiveness}%</span>
          </div>
          <Progress
            value={analytics.effectiveness}
            className={`h-2 ${analytics.effectiveness > 70 ? 'bg-green-500' : 
              analytics.effectiveness > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6">
          <div className="flex items-center gap-3 rounded-md border p-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Profile Views</h4>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">Without Boost: {analytics.views.withoutBoost}</span>
                <span className="text-xs font-medium">With Boost: {analytics.views.withBoost}</span>
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+{analytics.views.increase}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-md border p-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <MousePointerClick className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Profile Clicks</h4>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">Without Boost: {analytics.clicks.withoutBoost}</span>
                <span className="text-xs font-medium">With Boost: {analytics.clicks.withBoost}</span>
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+{analytics.clicks.increase}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-md border p-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Search Ranking</h4>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">Without Boost: #{analytics.searchRanking.withoutBoost}</span>
                <span className="text-xs font-medium">With Boost: #{analytics.searchRanking.withBoost}</span>
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">Improved by {analytics.searchRanking.improvement} positions</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
