
import React from 'react';
import { Layout } from '@/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import EscortGrid from '@/components/escorts/EscortGrid';
import { mockEscorts } from '@/data/mockEscorts';

const HomePage = () => {
  const { user } = useAuth();
  
  return (
    <Layout 
      title="UberEscorts Ecosystem"
      description="The premier digital platform for escorts, clients, and AI companions"
      showBreadcrumbs={false}
    >
      <div className="space-y-8">
        <Card className="border-t-4 border-t-primary">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center space-x-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Secure Connection Active | Protected by Orus</span>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="escorts" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Content Creators</TabsTrigger>
            <TabsTrigger value="livecams">Live Cams</TabsTrigger>
            <TabsTrigger value="ai-companions">AI Companions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escorts" className="mt-6">
            <EscortGrid escorts={mockEscorts} />
          </TabsContent>
          
          <TabsContent value="creators" className="mt-6">
            <EscortGrid escorts={mockEscorts.filter(e => e.tags?.includes('creator'))} />
          </TabsContent>
          
          <TabsContent value="livecams" className="mt-6">
            <EscortGrid escorts={mockEscorts.filter(e => e.tags?.includes('livecam'))} />
          </TabsContent>
          
          <TabsContent value="ai-companions" className="mt-6">
            <EscortGrid escorts={mockEscorts.filter(e => e.tags?.includes('ai'))} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HomePage;
