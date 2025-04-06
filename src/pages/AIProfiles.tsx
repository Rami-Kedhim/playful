
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import AIProfileGrid from "@/components/ai/AIProfileGrid";
import AIProfileGenerator from "@/components/ai/AIProfileGenerator";
import AIProfileDetail from "@/components/ai/AIProfileDetail";
import useAIProfileStore from "@/store/aiProfileStore";
import { AIProfile } from "@/types/ai";
import { Card } from "@/components/ui/card";

const AIProfiles = () => {
  const { initialize, profiles, featuredProfiles, loading } = useAIProfileStore();
  const [selectedProfile, setSelectedProfile] = useState<AIProfile | null>(null);
  const [activeTab, setActiveTab] = useState("browse");

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSelectProfile = (profile: AIProfile) => {
    setSelectedProfile(profile);
    setActiveTab("detail");
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">AI Companions</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="detail" disabled={!selectedProfile}>
              {selectedProfile ? `Chat with ${selectedProfile.name}` : "Chat"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-8">
            {loading ? (
              <div className="text-center py-12">Loading AI profiles...</div>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-bold mb-4">Featured Companions</h2>
                  <AIProfileGrid 
                    profiles={featuredProfiles}
                    onSelectProfile={handleSelectProfile}
                  />
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">All Companions</h2>
                  <AIProfileGrid 
                    profiles={profiles}
                    onSelectProfile={handleSelectProfile} 
                  />
                </section>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="generate">
            <AIProfileGenerator onSelectProfile={handleSelectProfile} />
          </TabsContent>
          
          <TabsContent value="detail">
            {selectedProfile ? (
              <AIProfileDetail profile={selectedProfile} />
            ) : (
              <Card className="p-8 text-center">
                Please select a profile to chat with
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AIProfiles;
