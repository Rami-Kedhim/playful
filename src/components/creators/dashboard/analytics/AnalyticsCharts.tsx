
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsChartsProps {
  chartData: any[];
  isLoading: boolean;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ chartData, isLoading }) => {
  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Track your content performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="views">
            <TabsList>
              <TabsTrigger value="views">Views</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            <TabsContent value="views" className="h-[400px] mt-4">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#6366f1" 
                      activeDot={{ r: 8 }} 
                      name="Views"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            <TabsContent value="engagement" className="h-[400px] mt-4">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#3b82f6" name="Likes" />
                    <Bar dataKey="shares" fill="#10b981" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            <TabsContent value="earnings" className="h-[400px] mt-4">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#f59e0b" 
                      activeDot={{ r: 8 }} 
                      name="Earnings ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
