
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Image, Video, Play } from 'lucide-react';
import { UberPersona } from '@/types/uberPersona';

interface PersonaContentTabProps {
  persona: UberPersona;
}

const PersonaContentTab: React.FC<PersonaContentTabProps> = ({ persona }) => {
  // Sample content items for demo
  const contentItems = [
    { id: '1', type: 'image', title: 'Beach photoshoot', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
    { id: '2', type: 'video', title: 'Workout routine', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
    { id: '3', type: 'image', title: 'City lights', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390' },
    { id: '4', type: 'video', title: 'Travel vlog', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd' }
  ];
  
  // Check if persona has content features
  const hasContentFeatures = () => {
    if (typeof persona.capabilities === 'object') {
      return Boolean(persona.capabilities.hasExclusiveContent);
    }
    return false;
  };
  
  // Get subscription price safely
  const getSubscriptionPrice = () => {
    if (typeof persona.monetization === 'object') {
      return persona.monetization.subscriptionPrice || 9.99;
    }
    return 9.99;
  };
  
  const subscriptionPrice = getSubscriptionPrice();

  // Default content counts if not available
  const getContentCounts = () => {
    return {
      photos: 12,
      videos: 5,
      streams: 1
    };
  };

  const contentCount = getContentCounts();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Exclusive Content</h3>
            <Button>Subscribe ${subscriptionPrice}/month</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {contentItems.map((item) => (
              <div key={item.id} className="relative group">
                <div className="aspect-square overflow-hidden rounded-md bg-muted">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  {item.isPremium && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    {item.type === 'video' ? (
                      <div className="bg-black/70 p-1 rounded-full">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="bg-black/70 p-1 rounded-full">
                        <Image className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm truncate">{item.title}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">View All Content ({contentCount.photos + contentCount.videos})</Button>
          </div>
        </CardContent>
      </Card>
      
      {contentCount.streams > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upcoming Livestreams</h3>
              <Button variant="outline" size="sm">View Schedule</Button>
            </div>
            
            <div className="bg-muted p-4 rounded-md text-center">
              <p>Next stream: Friday at 8:00 PM</p>
              <Button className="mt-2">Get Notified</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonaContentTab;
