
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Creator } from '@/hooks/useCreators';
import { Check, CalendarDays, Users, ImageIcon, Video, Award } from "lucide-react";

interface CreatorAboutProps {
  creator: Creator;
}

const CreatorAbout: React.FC<CreatorAboutProps> = ({ creator }) => {
  const joinedDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };
  
  const contentStats = {
    photos: creator.contentCount?.photos || Math.floor(Math.random() * 200) + 50,
    videos: creator.contentCount?.videos || Math.floor(Math.random() * 30) + 5,
    livestreams: Math.floor(Math.random() * 20) + 1,
    posts: Math.floor(Math.random() * 100) + 30,
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">About Me</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {creator.bio || `Hi, I'm ${creator.name}! I'm a content creator specializing in lifestyle, fashion, and travel content.
            
I love sharing my life and experiences with my subscribers. When I'm not creating content, I enjoy hiking, cooking, and spending time with friends.

Thanks for stopping by my profile and I hope you enjoy my content!`}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Content Stats</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">{contentStats.photos}</span>
              <span className="text-xs text-muted-foreground">Photos</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">{contentStats.videos}</span>
              <span className="text-xs text-muted-foreground">Videos</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">{contentStats.livestreams}</span>
              <span className="text-xs text-muted-foreground">Livestreams</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">{contentStats.posts}</span>
              <span className="text-xs text-muted-foreground">Posts</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                {formatDate(joinedDate)}
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subscribers</span>
              <span>{creator.subscriberCount?.toLocaleString() || '5,000+'}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subscription price</span>
              <span>${creator.price}/month</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rating</span>
              <div className="flex items-center">
                <span className="text-primary font-medium mr-1">{creator.rating}</span>
                <span className="text-xs text-muted-foreground">/ 5</span>
              </div>
            </div>
            
            {creator.isPremium && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium creator</span>
                  <Check className="text-primary h-5 w-5" />
                </div>
              </>
            )}
            
            {creator.isAI && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI companion</span>
                  <Check className="text-primary h-5 w-5" />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      {creator.tags && creator.tags.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Tags & Categories</h3>
            
            <div className="flex flex-wrap gap-2">
              {creator.tags.map((tag, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                  {tag}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreatorAbout;
