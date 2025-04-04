
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2, TrendingUp } from "lucide-react";

interface BoostAnalyticsCardProps {
  profileId: string;
  isActive: boolean;
}

const BoostAnalyticsCard = ({ profileId, isActive }: BoostAnalyticsCardProps) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const data = {
        views: {
          withBoost: Math.floor(Math.random() * 200) + 100,
          withoutBoost: Math.floor(Math.random() * 100) + 30,
        },
        clicks: {
          withBoost: Math.floor(Math.random() * 80) + 40,
          withoutBoost: Math.floor(Math.random() * 40) + 10,
        },
        messages: {
          withBoost: Math.floor(Math.random() * 40) + 20,
          withoutBoost: Math.floor(Math.random() * 20) + 5,
        },
        effectiveness: Math.floor(Math.random() * 40) + 60
      };
      
      setAnalytics(data);
      setLoading(false);
    };
    
    fetchAnalytics();
  }, [profileId]);

  const chartData = analytics ? [
    { name: 'Profile Views', withBoost: analytics.views.withBoost, withoutBoost: analytics.views.withoutBoost },
    { name: 'Profile Clicks', withBoost: analytics.clicks.withBoost, withoutBoost: analytics.clicks.withoutBoost },
    { name: 'Messages', withBoost: analytics.messages.withBoost, withoutBoost: analytics.messages.withoutBoost },
  ] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Boost Performance
        </CardTitle>
        <CardDescription>
          {isActive 
            ? "Your current boost performance" 
            : "Potential boost impact based on historical data"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : analytics ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Boost Effectiveness</span>
                <span className="text-lg font-bold">{analytics.effectiveness}%</span>
              </div>
              <Progress value={analytics.effectiveness} className="h-2 bg-gray-200" />
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="withBoost" name="With Boost" fill="#3b82f6" />
                  <Bar dataKey="withoutBoost" name="Without Boost" fill="#9ca3af" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="pt-2 text-xs text-muted-foreground">
              <p>This data shows the impact of profile boosting on your visibility and engagement.</p>
              {!isActive && (
                <p className="mt-1 font-medium text-primary">Boost your profile to improve these metrics.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>No analytics data available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
