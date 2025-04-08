
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, Users } from "lucide-react";
import { Creator } from '@/hooks/useCreators';

interface CreatorLivestreamsProps {
  creator: Creator;
  isSubscribed: boolean;
}

const CreatorLivestreams: React.FC<CreatorLivestreamsProps> = ({ creator, isSubscribed }) => {
  // Demo livestream data - in production would come from API
  const upcoming = [
    {
      id: "ls-1",
      title: "Weekend Q&A Session",
      scheduledFor: new Date(Date.now() + 48 * 60 * 60 * 1000),
      duration: 60,
      description: "Join me for a casual Q&A session where I'll answer all your questions!",
      thumbnailUrl: `https://picsum.photos/seed/${creator.id}-live-1/500/300`,
      isPremium: false
    },
    {
      id: "ls-2",
      title: "Premium Behind The Scenes",
      scheduledFor: new Date(Date.now() + 96 * 60 * 60 * 1000),
      duration: 45,
      description: "Exclusive behind the scenes look at my latest photoshoot.",
      thumbnailUrl: `https://picsum.photos/seed/${creator.id}-live-2/500/300`,
      isPremium: true
    }
  ];
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const isLive = creator.isLive;

  return (
    <ScrollArea className="h-[600px] pr-4">
      {isLive && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <h3 className="font-semibold">Live Now</h3>
          </div>
          
          <Card>
            <div className="relative">
              <img 
                src={`https://picsum.photos/seed/${creator.id}-live-now/800/400`} 
                alt="Current livestream"
                className="w-full aspect-video object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                LIVE
              </div>
              
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {Math.floor(Math.random() * 500) + 50} watching
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">Live Chat With Fans</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join the conversation and interact with me live!
              </p>
              
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Started 25 minutes ago
                </p>
                
                <Button>
                  {isSubscribed ? "Join Stream" : "Subscribe to Join"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Upcoming Livestreams</h3>
        
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map(stream => (
              <Card key={stream.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img 
                      src={stream.thumbnailUrl} 
                      alt={stream.title}
                      className="w-full h-full object-cover aspect-video md:aspect-auto"
                    />
                    {stream.isPremium && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        Premium
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:w-2/3">
                    <h4 className="font-medium mb-1">{stream.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(stream.scheduledFor)}
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {stream.duration} minutes
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      {stream.isPremium && !isSubscribed ? (
                        <p className="text-xs text-primary">Premium subscribers only</p>
                      ) : (
                        <div></div>
                      )}
                      
                      <Button variant="outline" size="sm">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No upcoming livestreams scheduled</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {!isSubscribed && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <p className="font-medium mb-2">Get notified about {creator.name}'s livestreams</p>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive notifications when {creator.name} goes live
            </p>
            <Button>Subscribe Now</Button>
          </CardContent>
        </Card>
      )}
    </ScrollArea>
  );
};

export default CreatorLivestreams;
