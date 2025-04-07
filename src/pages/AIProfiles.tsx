import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIProfileDetail from "@/components/ai/AIProfileDetail";
import AIProfileGenerator from "@/components/ai/AIProfileGenerator";
import useAIProfileStore from "@/store/aiProfileStore";
import { AIProfile } from "@/types/ai-profile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AIProfileCard from "@/components/ai/AIProfileCard";
import { Loader2, Sparkles, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { AICompanionChat } from "@/components/ai";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExtendedAIProfile extends AIProfile {
  tags?: string[];
}

const AIProfiles = () => {
  const { initialize, profiles, featuredProfiles, loading } = useAIProfileStore();
  const [selectedProfile, setSelectedProfile] = useState<ExtendedAIProfile | null>(null);
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const tags = new Set<string>();
    (profiles as ExtendedAIProfile[]).forEach(profile => {
      profile.tags?.forEach(tag => tag && tags.add(tag));
    });
    setAvailableTags(Array.from(tags).sort());
  }, [profiles]);

  const handleSelectProfile = (profile: ExtendedAIProfile) => {
    setSelectedProfile(profile);
    setActiveTab("detail");
  };

  const handleGenerateSuccess = (profile: ExtendedAIProfile) => {
    toast({
      title: "AI Profile Generated",
      description: `${profile.name} has been created successfully!`,
    });
    setSelectedProfile(profile);
    setActiveTab("detail");
  };

  const handleTagToggle = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const filteredProfiles = (profiles as ExtendedAIProfile[]).filter(profile => {
    const matchesSearch = !searchTerm || 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = activeTags.length === 0 || 
      activeTags.every(tag => profile.tags?.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Companions
          </h1>
          <p className="text-muted-foreground">
            Chat with intelligent AI personalities customized to your preferences
          </p>
        </div>
        
        <Button onClick={() => setActiveTab("generate")} className="gap-1 w-full md:w-auto">
          <Plus className="h-4 w-4" />
          Create New Companion
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="detail" disabled={!selectedProfile}>
            {selectedProfile ? `Chat with ${selectedProfile.name}` : "Chat"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative w-full md:w-2/3">
              <Input
                placeholder="Search companions by name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full md:w-auto">
                  <Filter className="h-4 w-4" />
                  Filter by Tags
                  {activeTags.length > 0 && (
                    <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {activeTags.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <ScrollArea className="h-72">
                  {availableTags.map(tag => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={activeTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {loading ? (
            <div className="text-center py-12 flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
              <p>Loading AI companions...</p>
            </div>
          ) : (
            <>
              {featuredProfiles.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Featured Companions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProfiles.map(profile => (
                      <AIProfileCard 
                        key={profile.id} 
                        profile={profile as ExtendedAIProfile} 
                        onChatClick={() => handleSelectProfile(profile as ExtendedAIProfile)}
                      />
                    ))}
                  </div>
                </section>
              )}
              
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  {filteredProfiles.length > 0 ? 'All Companions' : 'No Companions Found'}
                </h2>
                {filteredProfiles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfiles.map(profile => (
                      <AIProfileCard 
                        key={profile.id} 
                        profile={profile} 
                        onChatClick={() => handleSelectProfile(profile)}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <CardDescription>
                      No companions match your search criteria. Try different keywords or filters.
                    </CardDescription>
                  </Card>
                )}
              </section>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="generate">
          <AIProfileGenerator onSelectProfile={handleGenerateSuccess} />
        </TabsContent>
        
        <TabsContent value="detail">
          {selectedProfile ? (
            <AIProfileDetail profile={selectedProfile} />
          ) : (
            <Card className="p-8 text-center">
              <CardDescription>
                Please select a profile to chat with
              </CardDescription>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {selectedProfile && activeTab === "detail" && (
        <AICompanionChat 
          companionId={selectedProfile.id}
          initiallyOpen={true}
          onClose={() => setActiveTab("browse")}
        />
      )}
    </div>
  );
};

export default AIProfiles;
