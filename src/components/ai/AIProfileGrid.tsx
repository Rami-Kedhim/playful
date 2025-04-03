
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIProfile } from '@/types/ai-profile';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getAIProfiles } from '@/services/ai/aiProfilesService';
import { MessageSquare, Image } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AIProfileGrid = () => {
  const [profiles, setProfiles] = useState<AIProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      try {
        const fetchedProfiles = await getAIProfiles();
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error loading AI profiles:", error);
        toast({
          title: "Failed to load AI profiles",
          description: "There was an error loading the AI profiles. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadProfiles();
  }, []);
  
  const handleChatClick = (profileId: string) => {
    navigate(`/ai-chat/${profileId}`);
  };
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="w-full h-48" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (profiles.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No AI profiles available</h3>
        <p className="text-muted-foreground mt-2">Check back later for new AI companions.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <Card key={profile.id} className="overflow-hidden flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={profile.avatar_url} 
              alt={profile.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.age} • {profile.location}</p>
              </div>
              {profile.personality && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {profile.personality.type}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm line-clamp-3">{profile.bio}</p>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {profile.interests?.slice(0, 3).map((interest, i) => (
                  <span key={i} className="bg-muted text-xs px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
                {profile.interests && profile.interests.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{profile.interests.length - 3} more</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button 
              className="flex-1 gap-2"
              onClick={() => handleChatClick(profile.id)}
            >
              <MessageSquare size={16} /> Chat
            </Button>
            <Button 
              variant="outline" 
              className="flex gap-2"
            >
              <Image size={16} /> Images
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AIProfileGrid;
