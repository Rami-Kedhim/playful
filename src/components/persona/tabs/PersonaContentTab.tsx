import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { UberPersona } from '@/types/UberPersona';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayIcon, LockIcon } from "lucide-react";

interface PersonaContentTabProps {
  persona: UberPersona;
}

export const PersonaContentTab: React.FC<PersonaContentTabProps> = ({ persona }) => {
  const [selectedTab, setSelectedTab] = useState('photos');

  // Determine if persona has exclusive content by checking monetization flag
  const showExclusiveContent = persona.monetization?.subscriptionPrice !== undefined && persona.monetization?.subscriptionPrice > 0;

  // Generate placeholder content based on persona type
  const generatePlaceholderContent = (type: 'photos' | 'videos') => {
    const count = type === 'photos' ? 9 : 6;
    return Array.from({ length: count }).map((_, index) => {
      const isExclusive = index % 3 === 0 && showExclusiveContent;
      return (
        <Card key={index} className="overflow-hidden relative group">
          <div className="aspect-video bg-muted relative">
            {type === 'photos' ? (
              <img 
                src={`https://source.unsplash.com/random/300x200?portrait&sig=${persona.id}${index}`} 
                className="object-cover w-full h-full"
                alt={`${persona.displayName || persona.id} content ${index}`}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-800 text-white">
                <PlayIcon className="w-12 h-12 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            {isExclusive && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-amber-500">
                  <LockIcon className="w-3 h-3 mr-1" /> Premium
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-3">
            <div className="flex justify-between items-center">
              <p className="text-sm truncate">
                {type === 'photos' ? `Photo ${index + 1}` : `Video ${index + 1}`}
              </p>
              {isExclusive ? (
                <Button variant="outline" size="sm" className="text-xs">
                  Unlock
                </Button>
              ) : (
                <Badge variant="outline" className="text-xs">Free</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      );
    });
  };
  
  return (
    <div>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          {showExclusiveContent && (
            <TabsTrigger value="exclusive">Exclusive</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="photos">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {generatePlaceholderContent('photos')}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generatePlaceholderContent('videos')}
          </div>
        </TabsContent>
        
        {showExclusiveContent && (
          <TabsContent value="exclusive">
            <div className="space-y-6">
              <div className="bg-muted/30 border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium mb-2">Premium Content</h3>
                <p className="text-muted-foreground mb-4">
                  Access exclusive content from {persona.displayName || (persona as any).name} with a premium subscription.
                </p>
                <Button>
                  <LockIcon className="w-4 h-4 mr-2" />
                  Subscribe for Premium
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden relative group">
                    <div className="aspect-square bg-muted relative flex items-center justify-center">
                      <LockIcon className="w-8 h-8 text-muted-foreground/70" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary">Unlock</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default PersonaContentTab;
