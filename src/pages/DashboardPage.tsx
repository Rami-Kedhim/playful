
import React, { useState, useEffect } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';
import { Activity, Users, Brain, Shield } from 'lucide-react';
import ActionGrid from '@/components/home/ActionGrid';
import BoostLiveMonitor from '@/components/home/BoostLiveMonitor';
import { FeaturedContent } from '@/components/home/FeaturedContent';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [boostStats, setBoostStats] = useState({
    activeBoosts: 324,
    topBoostScore: 94,
    averageVisibility: 68,
    peakHours: ['8:00 PM', '9:00 PM', '10:00 PM'],
    recentChanges: [5, 2, -1, 3, 8, 4, -2, 6]
  });

  // Mock featured content with proper typing
  const featuredEscorts = [
    {
      id: 'esc1',
      title: 'Sophia Lynn',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Sophia',
      type: 'escort' as const,
      rating: 4.9,
      price: '$300/hr',
      location: 'Los Angeles, CA',
      featured: true
    },
    {
      id: 'esc2',
      title: 'Emma Watson',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Emma',
      type: 'escort' as const,
      rating: 4.8,
      price: '$280/hr',
      location: 'New York, NY'
    },
    {
      id: 'esc3',
      title: 'Jessica Parker',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Jessica',
      type: 'escort' as const,
      rating: 4.7,
      price: '$250/hr',
      location: 'Miami, FL'
    },
    {
      id: 'esc4',
      title: 'Olivia Marks',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Olivia',
      type: 'escort' as const,
      rating: 4.8,
      price: '$300/hr',
      location: 'Chicago, IL'
    }
  ];

  const latestStats = [
    {
      title: 'Active Users',
      value: '1,293',
      change: '+12%',
      icon: <Users className="w-4 h-4" />
    },
    {
      title: 'Neural Health',
      value: '98.2%',
      change: '+0.5%',
      icon: <Brain className="w-4 h-4" />
    },
    {
      title: 'System Load',
      value: '34%',
      change: '-2%',
      icon: <Activity className="w-4 h-4" />
    },
    {
      title: 'Safety Score',
      value: '98%',
      change: '+1%',
      icon: <Shield className="w-4 h-4" />
    }
  ];

  return (
    <Layout 
      title="Dashboard"
      description="Welcome to UberEscorts Platform Dashboard"
      showBreadcrumbs
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestStats.map((stat, idx) => (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Boost Monitor */}
          <BoostLiveMonitor stats={boostStats} isLoading={false} />
          
          {/* Action Grid for quick links */}
          <ActionGrid />
          
          {/* Featured Escorts */}
          <FeaturedContent 
            title="Featured Escorts" 
            items={featuredEscorts}
            type="escort"
            viewAllLink={AppPaths.ESCORTS}
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">View detailed analytics of the platform performance and user engagement.</p>
              <button 
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                onClick={() => navigate(AppPaths.NEURAL_ANALYTICS)}
              >
                Go to Analytics
              </button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Platform Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage and monitor platform services and integrations.</p>
              <button 
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                onClick={() => navigate(AppPaths.NEURAL_MONITOR)}
              >
                Neural Monitor
              </button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default DashboardPage;
