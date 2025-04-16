
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ExternalLink, Play } from 'lucide-react';
import { UberPersona } from '@/types/uberPersona';

interface PersonaContentTabProps {
  persona: UberPersona;
}

const PersonaContentTab: React.FC<PersonaContentTabProps> = ({ persona }) => {
  // Mock content items
  const contentItems = [
    { id: 1, title: "Special Photoshoot", type: "gallery", isPremium: true, thumbnail: "/images/gallery-thumb-1.jpg" },
    { id: 2, title: "Behind the Scenes", type: "video", isPremium: true, thumbnail: "/images/video-thumb-1.jpg" },
    { id: 3, title: "Beach Day", type: "gallery", isPremium: false, thumbnail: "/images/gallery-thumb-2.jpg" },
  ];

  // Default capabilities if not present
  const capabilities = persona.capabilities || {
    hasContent: true,
    hasLiveStream: false,
    hasVirtualMeets: true,
    hasRealMeets: false
  };
  
  // Default monetization if not present
  const monetization = persona.monetization || {
    acceptsLucoin: true,
    subscriptionPrice: 9.99,
    pricePerMessage: 1
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Content</h2>
        
        {capabilities.hasContent && (
          <Button>
            Subscribe ({monetization.subscriptionPrice ? `$${monetization.subscriptionPrice}/mo` : 'Free'})
          </Button>
        )}
      </div>
      
      {/* Content grid */}
      {contentItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {contentItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square bg-muted">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {item.isPremium && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <span className="text-white font-medium">Premium Content</span>
                    </div>
                  </div>
                )}
                
                {item.type === 'video' && (
                  <div className="absolute bottom-2 right-2 bg-black/60 rounded-full p-2">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">No content available yet</p>
        </div>
      )}
    </div>
  );
};

export default PersonaContentTab;
