
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatorAnalytics from "@/components/creators/dashboard/CreatorAnalytics";
import TopContent from "@/components/creators/dashboard/TopContent";
import ContentManagement from "@/components/creators/dashboard/ContentManagement";
import { useCreatorAnalytics } from "@/hooks/useCreatorAnalytics";

const CreatorDashboard = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const { 
    analytics, 
    analyticsHistory, 
    demographics, 
    topContent, 
    loading 
  } = useCreatorAnalytics(period);

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <CreatorAnalytics 
              analytics={analytics}
              analyticsHistory={analyticsHistory}
              demographics={demographics}
              period={period}
              setPeriod={setPeriod}
              loading={loading}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ContentManagement />
              </div>
              <div>
                <TopContent content={topContent} loading={loading} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>
          
          <TabsContent value="earnings">
            <div className="bg-card p-8 rounded-lg border">
              <h2 className="text-2xl font-bold mb-4">Earnings</h2>
              <p className="text-muted-foreground">
                Earnings features coming soon. Check back later for more information.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="subscribers">
            <div className="bg-card p-8 rounded-lg border">
              <h2 className="text-2xl font-bold mb-4">Subscribers</h2>
              <p className="text-muted-foreground">
                Subscriber management features coming soon. Check back later for more information.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CreatorDashboard;
