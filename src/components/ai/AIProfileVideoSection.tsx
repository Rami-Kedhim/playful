
import { useState } from "react";
import { AIProfile } from "@/types/ai-profile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Lock, Film } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAIModelMonetizationStore from "@/store/aiModelMonetizationStore";

interface AIProfileVideoSectionProps {
  profile: AIProfile;
}

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  price: number;
  isPremium: boolean;
}

const AIProfileVideoSection: React.FC<AIProfileVideoSectionProps> = ({ profile }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { unlockVideo, isVideoUnlocked } = useAIModelMonetizationStore();
  
  // Mock videos - in a real app these would come from an API
  const mockVideos: VideoItem[] = [
    {
      id: "video-1",
      title: "Hello from " + profile.name,
      thumbnail: profile.gallery_images?.[0] || profile.avatar_url,
      url: "https://example.com/video1.mp4",
      duration: "0:32",
      price: 15,
      isPremium: true
    },
    {
      id: "video-2",
      title: "My day",
      thumbnail: profile.gallery_images?.[1] || profile.avatar_url,
      url: "https://example.com/video2.mp4",
      duration: "1:45",
      price: 25,
      isPremium: true
    }
  ];
  
  const handleUnlockVideo = async (video: VideoItem) => {
    if (await unlockVideo(profile.id, video.id, video.price)) {
      setSelectedVideo(video);
      setIsPlaying(true);
    }
  };
  
  const handlePlayVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };
  
  if (!profile.premium_content_count?.videos && mockVideos.length === 0) {
    return null;
  }
  
  return (
    <>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Film className="mr-2 h-5 w-5" />
            Videos
            {profile.premium_content_count?.videos && (
              <span className="text-xs ml-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded">
                {profile.premium_content_count.videos} videos
              </span>
            )}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockVideos.map(video => {
              const unlocked = isVideoUnlocked(profile.id, video.id);
              
              return (
                <div key={video.id} className="rounded-md overflow-hidden border bg-card relative">
                  <div className="aspect-video relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      {video.isPremium && !unlocked ? (
                        <Button 
                          variant="secondary" 
                          className="flex items-center gap-2"
                          onClick={() => handleUnlockVideo(video)}
                        >
                          <Lock className="h-4 w-4" /> Unlock {video.price} LC
                        </Button>
                      ) : (
                        <Button 
                          variant="secondary" 
                          className="rounded-full h-12 w-12 flex items-center justify-center p-0"
                          onClick={() => handlePlayVideo(video)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded-sm">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedVideo && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">{selectedVideo.title}</h2>
              <div className="aspect-video bg-black flex items-center justify-center">
                <p className="text-white text-center">
                  [Video Player - In production this would show the actual video]
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIProfileVideoSection;
