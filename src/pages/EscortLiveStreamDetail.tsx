
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Share, Zap, User } from 'lucide-react';
import LivecamDetailLayout from '@/layouts/LivecamDetailLayout';
import { useLivecamDetail } from '@/hooks/useLivecamDetail';

const EscortLiveStreamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { livecam, stats, boostStatus, loading, error, boostLivecam, cancelBoost } = useLivecamDetail(id);

  // Add these default values to fix the errors
  const displayName = livecam?.displayName || livecam?.name || 'Performer';
  const viewerCount = livecam?.viewCount || 0;
  const thumbnailUrl = livecam?.thumbnailUrl || livecam?.imageUrl || 'https://example.com/placeholder.jpg';

  useEffect(() => {
    // Simulate starting the stream on component mount
    console.log('Stream started for ID:', id);
    return () => {
      console.log('Stream cleanup for ID:', id);
    };
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="bg-muted h-96 rounded-lg mb-4"></div>
          <div className="bg-muted h-10 w-64 rounded-md mb-4"></div>
          <div className="bg-muted h-6 w-32 rounded-md"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <h2 className="font-semibold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Stream video component render
  const streamVideo = (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-4 rounded-xl bg-black/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white">Live Stream: {displayName}</h3>
        </div>
      </div>
      
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
          LIVE
        </span>
      </div>
      
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white">
          <User className="w-3 h-3 mr-1" /> {viewerCount}
        </span>
      </div>
      
      <img 
        src={thumbnailUrl} 
        alt={`${displayName}'s stream`}
        className="w-full h-full object-cover"
      />
    </div>
  );
  
  // Performer info sidebar
  const performerInfo = (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{displayName}</h3>
          <p className="text-sm text-muted-foreground">Live Performer</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" variant="outline" className="w-full">
          <Heart className="mr-2 h-4 w-4" /> Follow
        </Button>
        <Button size="sm" variant="outline" className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" /> Chat
        </Button>
        <Button size="sm" variant="outline" className="w-full">
          <Share className="mr-2 h-4 w-4" /> Share
        </Button>
        <Button 
          size="sm" 
          variant={boostStatus?.isActive ? "default" : "outline"} 
          className="w-full"
          onClick={() => boostStatus?.isActive ? cancelBoost() : boostLivecam()}
        >
          <Zap className="mr-2 h-4 w-4" /> 
          {boostStatus?.isActive ? 'Cancel Boost' : 'Boost'}
        </Button>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-3">
        <h4 className="font-medium mb-2">Stream Stats</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Viewers:</span>
            <span className="font-medium">{viewerCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium">1:23:45</span>
          </div>
          <div className="flex justify-between">
            <span>Quality:</span>
            <span className="font-medium">HD</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Live chat component
  const liveChat = (
    <div className="rounded-lg border h-[300px] flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-medium">Live Chat</h3>
      </div>
      <div className="flex-1 p-3 overflow-auto bg-muted/20">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium">JohnDoe</p>
              <p className="text-sm">Great stream today!</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium">AL</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium">AnnaLee</p>
              <p className="text-sm">When is your next stream?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <LivecamDetailLayout
      livecamId={id}
      title={<h1 className="text-2xl font-bold">{displayName}'s Live Stream</h1>}
      mainContent={streamVideo}
      sidebar={performerInfo}
      chatContent={liveChat}
    />
  );
};

export default EscortLiveStreamDetail;
