
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AIProfile } from '@/types/ai-profile';
import { getAIProfiles } from '@/services/ai/aiProfileService';
import AppLayout from '@/components/layout/AppLayout';
import AIProfileCard from '@/components/ai/AIProfileCard';
import AIChat from '@/components/ai/AIChat';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  MessageSquare, 
  Filter, 
  Heart, 
  Clock, 
  User,
  WifiOff,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AIProfiles = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<AIProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<AIProfile | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [personalityFilter, setPersonalityFilter] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);
  const [interestFilter, setInterestFilter] = useState<string | null>(null);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  
  useEffect(() => {
    loadProfiles();
  }, [personalityFilter, availability, showPremiumOnly]);
  
  const loadProfiles = async () => {
    setLoading(true);
    
    try {
      const filters: Record<string, any> = {};
      
      if (personalityFilter) {
        filters.personality = personalityFilter;
      }
      
      if (availability) {
        filters.availability = availability;
      }
      
      if (interestFilter) {
        filters.interest = interestFilter;
      }
      
      if (showPremiumOnly) {
        filters.quality = 'premium';
      }
      
      const data = await getAIProfiles(filters);
      setProfiles(data);
    } catch (error) {
      console.error('Error loading AI profiles:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStartChat = (profile: AIProfile) => {
    setSelectedProfile(profile);
    setChatOpen(true);
  };
  
  const filteredProfiles = profiles.filter(profile => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(query) ||
      profile.location.toLowerCase().includes(query) ||
      profile.bio.toLowerCase().includes(query) ||
      profile.interests.some(interest => interest.toLowerCase().includes(query))
    );
  });

  // Get all unique interests across all profiles
  const allInterests = [...new Set(profiles.flatMap(p => p.interests))].sort();
  
  return (
    <AppLayout>
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">AI Companions</h1>
            <p className="text-muted-foreground">
              Chat with AI-powered virtual profiles
            </p>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-black/10 backdrop-blur-sm font-normal border-none">
              AI-Generated Content
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, or interests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Tabs 
              defaultValue="all" 
              value={personalityFilter || 'all'}
              onValueChange={(value) => setPersonalityFilter(value === 'all' ? null : value)}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="flirty">Flirty</TabsTrigger>
                <TabsTrigger value="shy">Shy</TabsTrigger>
                <TabsTrigger value="dominant">Dominant</TabsTrigger>
                <TabsTrigger value="playful">Playful</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Availability</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={availability === null}
                  onCheckedChange={() => setAvailability(null)}
                >
                  All Statuses
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={availability === 'online'}
                  onCheckedChange={(checked) => setAvailability(checked ? 'online' : null)}
                >
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    Online Now
                  </div>
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Quality</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showPremiumOnly}
                  onCheckedChange={setShowPremiumOnly}
                >
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
                    Premium Only
                  </div>
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Interests</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={interestFilter === null}
                  onCheckedChange={() => setInterestFilter(null)}
                >
                  All Interests
                </DropdownMenuCheckboxItem>
                {allInterests.slice(0, 5).map((interest) => (
                  <DropdownMenuCheckboxItem
                    key={interest}
                    checked={interestFilter === interest}
                    onCheckedChange={(checked) => setInterestFilter(checked ? interest : null)}
                  >
                    {interest}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-[300px] w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <AIProfileCard
                key={profile.id}
                profile={profile}
                onChatClick={() => handleStartChat(profile)}
              />
            ))}
          </div>
        )}
        
        {filteredProfiles.length === 0 && !loading && (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <MessageSquare className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-medium">No AI profiles found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          </Card>
        )}
        
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="sm:max-w-[500px] h-[600px] p-0">
            {selectedProfile && (
              <AIChat 
                profileId={selectedProfile.id} 
                userProfile={profile}
                onClose={() => setChatOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default AIProfiles;
