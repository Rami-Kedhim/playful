
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, RefreshCw, TrendingUp, Coins, Users, ArrowUp, ArrowDown } from "lucide-react";
import { format, subDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AppLayout from "@/components/layout/AppLayout";

const UBXStatistics = () => {
  const [period, setPeriod] = useState<"7d" | "30d" | "all">("7d");
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<any>({
    totalUBXIssued: 0,
    totalUBXSpent: 0,
    totalUBXRetained: 0,
    dailyStats: [],
    activeUsers: 0,
    transactionCount: 0,
  });

  useEffect(() => {
    fetchUBXStats();
  }, [period]);

  const fetchUBXStats = async () => {
    setLoading(true);
    try {
      let days = period === "7d" ? 7 : period === "30d" ? 30 : 365;
      
      const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');
      
      // Fetch daily stats
      const { data: dailyStats, error: dailyStatsError } = await supabase
        .from('lucoin_stats')
        .select('*')
        .gte('stat_date', startDate)
        .order('stat_date', { ascending: true });
      
      if (dailyStatsError) {
        console.error("Error fetching daily stats:", dailyStatsError);
        return;
      }
      
      // Fetch transaction count
      const { count: transactionCount, error: transactionCountError } = await supabase
        .from('lucoin_transactions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startDate);
      
      if (transactionCountError) {
        console.error("Error fetching transaction count:", transactionCountError);
        return;
      }
      
      // Calculate totals
      const totalUBXIssued = dailyStats?.reduce((acc: number, curr: any) => acc + curr.total_recharged, 0) || 0;
      const totalUBXSpent = dailyStats?.reduce((acc: number, curr: any) => acc + curr.total_spent, 0) || 0;
      const totalUBXRetained = totalUBXIssued - totalUBXSpent;
      
      // Get active users
      const { data: activeUsers, error: activeUsersError } = await supabase
        .from('lucoin_transactions')
        .select('user_id', { count: 'exact', head: true })
        .gte('created_at', startDate);
      
      if (activeUsersError) {
        console.error("Error fetching active users:", activeUsersError);
        return;
      }
      
      // Format data for chart
      const chartData = dailyStats?.map((day: any) => ({
        date: format(new Date(day.stat_date), 'MMM dd'),
        issued: day.total_recharged || 0,
        spent: day.total_spent || 0,
        retained: day.total_retained || 0,
      })) || [];
      
      setStats({
        totalUBXIssued,
        totalUBXSpent,
        totalUBXRetained,
        dailyStats: chartData,
        activeUsers: activeUsers || 0,
        transactionCount: transactionCount || 0,
      });
      
    } catch (error) {
      console.error("Error fetching UBX stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">UBX Statistics</h1>
            <p className="text-muted-foreground">Monitor and analyze UBX token usage</p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={period} onValueChange={(v) => setPeriod(v as any)}>
              <TabsList>
                <TabsTrigger value="7d">7 Days</TabsTrigger>
                <TabsTrigger value="30d">30 Days</TabsTrigger>
                <TabsTrigger value="all">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="icon"
              onClick={fetchUBXStats}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Coins className="h-4 w-4 mr-2 text-primary" />
                Total UBX Issued
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{stats.totalUBXIssued.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <ArrowDown className="h-4 w-4 mr-2 text-red-500" />
                Total UBX Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{stats.totalUBXSpent.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
                Total UBX Retained
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{stats.totalUBXRetained.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                {period === "7d" ? "Past 7 days" : period === "30d" ? "Past 30 days" : "All time"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>UBX Activity</CardTitle>
            <CardDescription>Distribution of UBX tokens over time</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stats.dailyStats}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="issued" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="spent" 
                      stackId="2"
                      stroke="#ef4444" 
                      fill="#ef4444" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="retained" 
                      stackId="3"
                      stroke="#10b981" 
                      fill="#10b981" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transactions Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Overview of UBX transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Total Transactions</p>
                      <p className="text-sm text-muted-foreground">
                        {period === "7d" ? "Past 7 days" : period === "30d" ? "Past 30 days" : "All time"}
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stats.transactionCount.toLocaleString()}</div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Circulation Rate</p>
                      <p className="text-sm text-muted-foreground">Spent vs. Issued</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.totalUBXIssued 
                      ? `${((stats.totalUBXSpent / stats.totalUBXIssued) * 100).toFixed(1)}%`
                      : '0%'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-sm text-muted-foreground">Statistics refresh time</p>
                    </div>
                  </div>
                  <div className="text-lg font-medium">
                    {format(new Date(), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UBXStatistics;
