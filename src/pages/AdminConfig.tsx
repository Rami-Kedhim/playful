
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrainHubConfig from "@/components/admin/BrainHubConfig";
import NSFWAIProviderConfig from "@/components/admin/NSFWAIProviderConfig";

const AdminConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState("brain-hub");
  
  return (
    <>
      <Helmet>
        <title>Admin Configuration | UberEscorts</title>
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">Admin Configuration</h1>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="w-full">
              <TabsTrigger value="brain-hub">Brain Hub</TabsTrigger>
              <TabsTrigger value="nsfw-ai">NSFW AI Providers</TabsTrigger>
              <TabsTrigger value="geo-legal">Geo-Legal Compliance</TabsTrigger>
              <TabsTrigger value="monetization">Monetization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="brain-hub">
              <BrainHubConfig />
            </TabsContent>
            
            <TabsContent value="nsfw-ai">
              <NSFWAIProviderConfig />
            </TabsContent>
            
            <TabsContent value="geo-legal">
              <div className="p-6 bg-card border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Geo-Legal Compliance</h3>
                <p className="text-muted-foreground">
                  Configure region-specific content policies and age verification settings.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="monetization">
              <div className="p-6 bg-card border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Monetization Settings</h3>
                <p className="text-muted-foreground">
                  Configure Lucoin pricing, subscription tiers, and Chainstack integration settings.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </>
  );
};

export default AdminConfig;
