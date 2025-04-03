
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, UsersIcon, DollarSign, Eye, Heart } from 'lucide-react';

interface AnalyticsStat {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  change: string;
  color: string;
  icon: React.ReactNode;
}

interface AnalyticsSummaryProps {
  stats: AnalyticsStat[];
}

interface ChartProps {
  data: any[];
  loading: boolean;
}

interface DemographicsProps {
  demographics: {
    age: { group: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    location: { country: string; percentage: number }[];
  };
  loading: boolean;
}

interface CreatorAnalyticsProps {
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<any>>;
  analyticsHistory: {
    date: string;
    views: number;
    likes: number;
    shares: number;
    earnings: number;
  }[];
  loading: boolean;
  demographics: {
    age: { group: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    location: { country: string; percentage: number }[];
  };
  analytics: {
    views: number;
    likes: number;
    shares: number;
    earnings: number;
  };
}

const AnalyticsSummary = ({ stats }: AnalyticsSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`text-${stat.color} bg-${stat.color}/10 p-2 rounded-full`}>
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs flex items-center text-${stat.color}`}>
              {stat.trend === "up" ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : 
               stat.trend === "down" ? <ArrowDownIcon className="mr-1 h-4 w-4" /> : 
               <ArrowUpIcon className="mr-1 h-4 w-4 opacity-0" />}
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const EngagementChart = ({ data, loading }: ChartProps) => {
  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
        <Line type="monotone" dataKey="shares" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const EarningsChart = ({ data, loading }: ChartProps) => {
  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="earnings" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const Demographics = ({ demographics, loading }: DemographicsProps) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6384'];
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={demographics.age}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="group"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {demographics.age.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={demographics.gender}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="type"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {demographics.gender.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Geographical Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={demographics.location}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="country"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {demographics.location.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const CreatorAnalytics = ({ 
  period, 
  setPeriod, 
  analyticsHistory, 
  loading,
  demographics,
  analytics
}: CreatorAnalyticsProps) => {
  // Prepare stats for summary cards
  const stats: AnalyticsStat[] = [
    {
      title: "Total Views",
      value: analytics.views.toLocaleString(),
      trend: "up" as const,
      change: "12% from last period",
      color: "green-500",
      icon: <Eye className="h-4 w-4" />
    },
    {
      title: "Total Likes",
      value: analytics.likes.toLocaleString(),
      trend: "up" as const,
      change: "9% from last period",
      color: "green-500",
      icon: <Heart className="h-4 w-4" />
    },
    {
      title: "Subscribers",
      value: (Math.floor(Math.random() * 1000) + 100).toLocaleString(),
      trend: "up" as const,
      change: "5% from last period",
      color: "green-500",
      icon: <UsersIcon className="h-4 w-4" />
    },
    {
      title: "Earnings",
      value: `$${analytics.earnings.toLocaleString()}`,
      trend: "up" as const,
      change: "7% from last period",
      color: "green-500",
      icon: <DollarSign className="h-4 w-4" />
    }
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Track your content performance and audience engagement
            </CardDescription>
          </div>
          <Tabs defaultValue={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnalyticsSummary stats={stats} />
        
        <Tabs defaultValue="engagement" className="mt-6">
          <TabsList>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <EngagementChart data={analyticsHistory} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="earnings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <EarningsChart data={analyticsHistory} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="demographics" className="mt-4">
            <Demographics demographics={demographics} loading={loading} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreatorAnalytics;
