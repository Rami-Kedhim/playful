
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AIProfileGrid from '@/components/ai/AIProfileGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AIProfiles = () => {
  return (
    <AppLayout>
      <div className="container px-4 py-8 mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">AI Companions</h1>
          <p className="text-muted-foreground">
            Chat and interact with AI companions. Generate images and have conversations with unique personalities.
          </p>
          
          <Tabs defaultValue="all" className="w-full mt-6">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Companions</TabsTrigger>
              <TabsTrigger value="flirty">Flirty</TabsTrigger>
              <TabsTrigger value="dominant">Dominant</TabsTrigger>
              <TabsTrigger value="shy">Shy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <AIProfileGrid />
            </TabsContent>
            
            <TabsContent value="flirty">
              <AIProfileGrid />
            </TabsContent>
            
            <TabsContent value="dominant">
              <AIProfileGrid />
            </TabsContent>
            
            <TabsContent value="shy">
              <AIProfileGrid />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIProfiles;
