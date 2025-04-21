
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIProfile } from '@/types/ai-profile';
import { useAIModelMonetization } from '@/hooks/ai/useAIModelMonetization';
import { Lock, Coins, Play, Video } from 'lucide-react';

interface AIProfileVideoSectionProps {
  profile: AIProfile;
}

const AIProfileVideoSection: React.FC<AIProfileVideoSectionProps> = ({ profile }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const aiModelMonetization = useAIModelMonetization();
  const { unlockVideo, isVideoUnlocked } = aiModelMonetization;
  
  const handleUnlockVideo = (videoUrl: string, price: number) => {
    if (unlockVideo) {
      unlockVideo(profile.id, videoUrl, price);
    }
  };
  
  // Generate mock preview images/videos based on gallery or profile image
  const previewImageUrl = profile.gallery_images && profile.gallery_images.length > 0
    ? profile.gallery_images[0]
    : profile.avatarUrl || profile.avatar_url;

  const videoUrl = previewImageUrl; // In a real app, this would be a separate video URL
  
  // Extract video URLs from the profile data
  const mockVideos = [
    { title: 'Introduction', duration: '1:25', url: videoUrl },
    { title: 'Studio Session', duration: '2:42', url: videoUrl },
    { title: 'Behind the Scenes', duration: '3:10', url: videoUrl }
  ];
  
  // Check if profile has premium content
  const hasPremiumContent = profile.premium_content_count && profile.premium_content_count > 0;
  
  if (!hasPremiumContent) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center p-6">
            <Video className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No Premium Videos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This profile doesn't have any premium video content yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Premium Videos</h3>
          <span className="text-sm text-muted-foreground">
            {profile.premium_content_count} available
          </span>
        </div>
        
        {/* Featured video player */}
        <div className="relative aspect-video rounded-md overflow-hidden bg-black">
          {selectedVideo && isPlaying ? (
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={previewImageUrl} 
                alt="Video preview" 
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  onClick={() => {
                    if (selectedVideo) {
                      setIsPlaying(true);
                    } else {
                      setSelectedVideo(mockVideos[0].url);
                      if (isVideoUnlocked && isVideoUnlocked(mockVideos[0].url)) {
                        setIsPlaying(true);
                      }
                    }
                  }}
                  className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary"
                  size="icon"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              
              {selectedVideo && (!isVideoUnlocked || !isVideoUnlocked(selectedVideo)) && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                  <Lock className="h-10 w-10 text-white mb-2" />
                  <p className="text-white mb-2">Unlock Premium Content</p>
                  <Button 
                    onClick={() => handleUnlockVideo(selectedVideo, 10)}
                    className="flex items-center"
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Unlock (10 UBX)
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Video thumbnails */}
        <div className="grid grid-cols-3 gap-3">
          {mockVideos.map((video, index) => (
            <div 
              key={index} 
              className={`relative aspect-video rounded-md overflow-hidden cursor-pointer ${
                selectedVideo === video.url ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedVideo(video.url)}
            >
              <img 
                src={previewImageUrl} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/60">
                <p className="text-xs text-white truncate">{video.title}</p>
                <p className="text-[10px] text-gray-300">{video.duration}</p>
              </div>
              
              {(!isVideoUnlocked || !isVideoUnlocked(video.url)) && (
                <div className="absolute top-1 right-1">
                  <Lock className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {profile.premium_content_count} videos
        </p>
        <Button variant="outline" size="sm">
          View All Content
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIProfileVideoSection;
