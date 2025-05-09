
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface LivecamProps {
  limit?: number;
}

export const LivecamPreviewGrid: React.FC<LivecamProps> = ({ limit = 8 }) => {
  // Mock data - in a real app this would come from an API
  const livecams = [
    { id: '1', name: 'Sophia R.', viewers: 243, isHD: true, thumbnail: '/assets/livecams/preview1.jpg', isPremium: true },
    { id: '2', name: 'Amelia K.', viewers: 182, isHD: true, thumbnail: '/assets/livecams/preview2.jpg', isPremium: false },
    { id: '3', name: 'Madison T.', viewers: 156, isHD: true, thumbnail: '/assets/livecams/preview3.jpg', isPremium: false },
    { id: '4', name: 'Victoria L.', viewers: 134, isHD: false, thumbnail: '/assets/livecams/preview4.jpg', isPremium: true },
    { id: '5', name: 'Olivia S.', viewers: 112, isHD: true, thumbnail: '/assets/livecams/preview5.jpg', isPremium: false },
    { id: '6', name: 'Emma D.', viewers: 97, isHD: true, thumbnail: '/assets/livecams/preview6.jpg', isPremium: true },
  ].slice(0, limit);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Live Broadcasts</h3>
          <p className="text-sm text-muted-foreground">Watch verified creators streaming now</p>
        </div>
        <Link to="/livecams" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {livecams.map((livecam) => (
          <Link key={livecam.id} to={`/livecams/${livecam.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-[3/4] relative bg-muted">
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {livecam.viewers}
                  </Badge>
                  {livecam.isHD && (
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      HD
                    </Badge>
                  )}
                </div>
                
                {livecam.isPremium && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 border-0">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white font-medium text-sm">{livecam.name}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
