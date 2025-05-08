
import React from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUberCoreNeuralMonitor } from '@/hooks/useUberCoreNeuralMonitor';
import { Brain, Heart, MessageSquare, Search, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';

const Dashboard = () => {
  const { health, refreshHealth, systemStatus } = useUberCoreNeuralMonitor();
  
  return (
    <Layout 
      title="Dashboard" 
      description="Welcome to UberEscorts ecosystem"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Neural Monitor
            </CardTitle>
            <CardDescription>System Health Status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">System Status</p>
                <p className="text-2xl font-bold">
                  {health.status === 'ok' ? 'Operational' : 'Degraded'}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                health.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {health.status === 'ok' ? '✓' : '!'}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => refreshHealth()}>
              Refresh Status
            </Button>
            <Link to={AppPaths.NEURAL_MONITOR} className="ml-auto">
              <Button size="sm">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Escort Network
            </CardTitle>
            <CardDescription>Active escort connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">24 new in the last hour</p>
            <div className="mt-4 h-2 rounded-full bg-secondary">
              <div className="h-full w-4/5 rounded-full bg-primary"></div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to={AppPaths.ESCORTS} className="w-full">
              <Button className="w-full">View Escorts</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              SEO Performance
            </CardTitle>
            <CardDescription>Content optimization metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Visibility Score</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Profiles Optimized</p>
                <p className="text-2xl font-bold">43</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to={AppPaths.SEO} className="w-full">
              <Button className="w-full">SEO Tools</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Messages
            </CardTitle>
            <CardDescription>Unread conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 new since last login</p>
          </CardContent>
          <CardFooter>
            <Link to={AppPaths.MESSAGES} className="w-full">
              <Button className="w-full" variant="outline">View Messages</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Safety Center
            </CardTitle>
            <CardDescription>Protection features status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">All safety systems operational</p>
          </CardContent>
          <CardFooter>
            <Link to={AppPaths.SAFETY} className="w-full">
              <Button className="w-full" variant="outline">Safety Center</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Favorites
            </CardTitle>
            <CardDescription>Your favorite escorts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 are online now</p>
          </CardContent>
          <CardFooter>
            <Link to={AppPaths.FAVORITES} className="w-full">
              <Button className="w-full" variant="outline">View Favorites</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
