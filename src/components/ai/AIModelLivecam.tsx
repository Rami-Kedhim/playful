
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, VideoOff, Tv2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AIProfile } from '@/types/ai-profile';

interface AIModelLivecamProps {
  aiProfile: AIProfile;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const AIModelLivecam: React.FC<AIModelLivecamProps> = ({
  aiProfile,
  onConnect,
  onDisconnect
}) => {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewers, setViewers] = useState(0);
  
  // Default video URL - replace with actual video source
  const defaultVideoImage = 'https://placehold.co/600x400?text=AI+Video+Stream';
  
  // Check if livecam is enabled for this AI profile
  const livecamEnabled = aiProfile.livecam_enabled || false;
  
  const handleConnect = () => {
    setIsLoading(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsLive(true);
      setViewers(Math.floor(Math.random() * 50) + 5);
      setIsLoading(false);
      
      if (onConnect) onConnect();
      
      toast({
        title: "Connected to livestream",
        description: `You are now connected to ${aiProfile.name}'s livestream`,
      });
    }, 2000);
  };
  
  const handleDisconnect = () => {
    setIsLive(false);
    setViewers(0);
    
    if (onDisconnect) onDisconnect();
    
    toast({
      title: "Disconnected from livestream",
      description: `You have disconnected from ${aiProfile.name}'s livestream`,
      variant: "destructive",
    });
  };
  
  if (!livecamEnabled) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/40 pb-2">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Live Video</span>
            <Badge variant="outline" className="text-muted-foreground">Offline</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="aspect-video bg-muted/30 rounded-md flex flex-col items-center justify-center p-4 text-center">
            <VideoOff className="h-10 w-10 text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground">
              {aiProfile.name} is not streaming right now
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/40 pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Live Video</span>
          {isLive ? (
            <Badge variant="destructive" className="animate-pulse">LIVE • {viewers} viewers</Badge>
          ) : (
            <Badge variant="outline">Ready to connect</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-video bg-black">
            {isLive ? (
              <img 
                src={aiProfile.avatarUrl || defaultVideoImage}
                alt={`${aiProfile.name}'s livestream`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30">
                <Tv2 className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <p className="text-muted-foreground">Preview not available</p>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 right-4">
            {!isLive ? (
              <Button 
                onClick={handleConnect} 
                disabled={isLoading}
                className="rounded-full"
                variant="destructive"
              >
                <Video className="mr-2 h-4 w-4" />
                {isLoading ? "Connecting..." : "Connect"}
              </Button>
            ) : (
              <Button 
                onClick={handleDisconnect}
                variant="outline"
                className="bg-black/70 text-white border-0 hover:bg-black/90 rounded-full"
              >
                <VideoOff className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIModelLivecam;
