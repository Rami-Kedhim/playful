
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalytics } from "@/hooks/useAnalytics";
import AnalyticsChart from "./analytics/AnalyticsChart";
import AnalyticsStats from "./analytics/AnalyticsStats";
import { Eye, ThumbsUp, DollarSign, Users } from "lucide-react";

const CreatorAnalytics = () => {
  const { analytics, loading, error } = useAnalytics();
  const [timeRange, setTimeRange] = useState("7days");

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-8 w-32 bg-muted rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full bg-muted rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-2">Error loading analytics data</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analytics) {
    return null; // or some fallback UI if needed
  }

  const statsData = [
    {
      title: "Total Views",
      value: analytics.views.total,
      change: analytics.views.change,
      icon: <Eye className="h-4 w-4 mr-2" />,
      trend: analytics.views.trend
    },
    {
      title: "Likes",
      value: analytics.likes.total,
      change: analytics.likes.change,
      icon: <ThumbsUp className="h-4 w-4 mr-2" />,
      trend: analytics.likes.trend
    },
    {
      title: "Revenue",
      value: `$${analytics.revenue.total}`,
      change: analytics.revenue.change,
      icon: <DollarSign className="h-4 w-4 mr-2" />,
      trend: analytics.revenue.trend
    },
    {
      title: "Subscribers",
      value: analytics.subscribers.total,
      change: analytics.subscribers.change,
      icon: <Users className="h-4 w-4 mr-2" />,
      trend: analytics.subscribers.trend
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AnalyticsStats statsData={statsData} isLoading={false} />

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsChart 
            data={analytics.chartData} 
            timeRange={timeRange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorAnalytics;
