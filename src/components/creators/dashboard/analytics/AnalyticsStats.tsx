
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Eye, ArrowUpRight, ThumbsUp, Share2, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface AnalyticsStat {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}

interface AnalyticsStatsProps {
  statsData: AnalyticsStat[];
  isLoading: boolean;
}

const AnalyticsStats: React.FC<AnalyticsStatsProps> = ({ statsData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="p-4">
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              {stat.icon}
              <span className="ml-2">{stat.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className={`flex items-center text-xs ${
              stat.trend === "up" ? "text-green-500" : 
              stat.trend === "down" ? "text-red-500" : "text-gray-500"
            }`}>
              {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : null}
              <span>{stat.change} from previous period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsStats;
