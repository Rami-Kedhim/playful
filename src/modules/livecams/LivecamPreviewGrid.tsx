
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LivecamPreview {
  id: string;
  title: string;
  thumbnailUrl: string;
  streamerName: string;
  viewerCount: number;
  isLive: boolean;
  isVerified: boolean;
  tags: string[];
}

interface LivecamPreviewGridProps {
  limit?: number;
  title?: string;
  showMoreLink?: string;
}

export const LivecamPreviewGrid: React.FC<LivecamPreviewGridProps> = ({
  limit = 4,
  title = "Live Now",
  showMoreLink = "/livecams"
}) => {
  // This would be replaced with actual data from an API
  const livecams: LivecamPreview[] = [
    {
      id: '1',
      title: 'Evening Chat & Relaxation',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      streamerName: 'Sophia',
      viewerCount: 245,
      isLive: true,
      isVerified: true,
      tags: ['chat', 'dance']
    },
    {
      id: '2',
      title: 'Friday Dance Party',
      thumbnailUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      streamerName: 'Alexa',
      viewerCount: 189,
      isLive: true,
      isVerified: true,
      tags: ['dance', 'music']
    },
    {
      id: '3',
      title: 'Let\'s Talk About Everything',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      streamerName: 'Jessica',
      viewerCount: 132,
      isLive: true,
      isVerified: false,
      tags: ['chat', 'advice']
    },
    {
      id: '4',
      title: 'Just Vibing',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      streamerName: 'Emma',
      viewerCount: 278,
      isLive: true,
      isVerified: true,
      tags: ['music', 'dance', 'chat']
    },
    {
      id: '5',
      title: 'Fitness & Wellness Hour',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      streamerName: 'Olivia',
      viewerCount: 156,
      isLive: true,
      isVerified: true,
      tags: ['fitness', 'wellness']
    },
    {
      id: '6',
      title: 'Tech Talk & Chill',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      streamerName: 'Mia',
      viewerCount: 93,
      isLive: true,
      isVerified: false,
      tags: ['tech', 'chat']
    }
  ];

  const limitedLivecams = livecams.slice(0, limit);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link to={showMoreLink}>
          <Button variant="outline">View All Streams</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {limitedLivecams.map((livecam) => (
          <Card key={livecam.id} className="overflow-hidden bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-video">
              <img 
                src={livecam.thumbnailUrl} 
                alt={livecam.title}
                className="w-full h-full object-cover"
              />
              {livecam.isLive && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>
                  LIVE
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                {livecam.viewerCount} viewers
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium truncate">{livecam.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {livecam.streamerName}
                    {livecam.isVerified && (
                      <span className="inline-flex ml-1 text-primary">✓</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {livecam.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/livecams/room/${livecam.id}`} className="w-full">
                <Button className="w-full" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Watch Stream
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
