
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import ProfileCompleteness from "@/components/profile/ProfileCompleteness";
import useCreators, { Creator } from "@/hooks/useCreators";
import { 
  CalendarDays, 
  Clock, 
  Heart, 
  Image as ImageIcon, 
  Lock, 
  MessageSquare, 
  Video, 
  Star, 
  Tv, 
  Globe,
  Shield, 
  Users
} from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import VirtualContentGallery from "@/components/creators/detail/VirtualContentGallery";
import ContentCreatorHero from "@/components/creators/detail/ContentCreatorHero";
import SubscriptionCard from "@/components/creators/detail/SubscriptionCard";
import CreatorStatistics from "@/components/creators/detail/CreatorStatistics";

const CreatorDetail = () => {
  const { username } = useParams<{ username: string }>();
  const { fetchCreatorByUsername, isLoading } = useCreators();
  const [creator, setCreator] = useState<Creator | null>(null);
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const loadCreator = async () => {
      if (!username) return;
      
      const creatorData = await fetchCreatorByUsername(username);
      if (creatorData) {
        setCreator(creatorData);
      }
    };

    loadCreator();
  }, [username, fetchCreatorByUsername]);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? `${creator?.name} has been removed from your favorites.` 
        : `${creator?.name} has been added to your favorites.`,
    });
  };

  const handleSubscribe = () => {
    toast({
      title: "Subscription processing",
      description: `Your subscription to ${creator?.name}'s content is being processed.`,
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Message sent",
      description: `Your message to ${creator?.name} has been sent.`,
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="w-full h-[400px] rounded-lg" />
          </div>
          <div>
            <Skeleton className="w-full h-[200px] rounded-lg mb-6" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!creator) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold mb-2">Creator Not Found</h2>
          <p className="text-gray-500 mb-4">The creator you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Use the new ContentCreatorHero component */}
      <ContentCreatorHero 
        creator={creator}
        isFavorited={isFavorited}
        onToggleFavorite={toggleFavorite}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column - Content Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="exclusives">Exclusives</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">About Me</h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">{creator.bio || "This creator hasn't added a bio yet."}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                      <div className="mb-1">
                        <StarRating rating={creator.rating || 0} size={18} />
                      </div>
                      <span className="font-semibold">{creator.rating?.toFixed(1) || "0.0"}/5</span>
                      <span className="text-xs text-gray-500">Rating</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                      <ImageIcon className="mb-1 text-blue-500" size={20} />
                      <span className="font-semibold">{creator.contentCount.photos}</span>
                      <span className="text-xs text-gray-500">Photos</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                      <Video className="mb-1 text-red-500" size={20} />
                      <span className="font-semibold">{creator.contentCount.videos}</span>
                      <span className="text-xs text-gray-500">Videos</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                      <Globe className="mb-1 text-green-500" size={20} />
                      <span className="font-semibold">Virtual</span>
                      <span className="text-xs text-gray-500">Experience</span>
                    </div>
                  </div>
                  
                  {creator.tags && creator.tags.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="capitalize">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="photos" className="mt-4">
              <VirtualContentGallery 
                contentType="photos"
                contentCount={creator.contentCount.photos}
                isPremium={creator.isPremium}
                creatorId={creator.id}
              />
            </TabsContent>
            
            <TabsContent value="videos" className="mt-4">
              <VirtualContentGallery 
                contentType="videos"
                contentCount={creator.contentCount.videos}
                isPremium={creator.isPremium}
                creatorId={creator.id}
              />
            </TabsContent>
            
            <TabsContent value="live" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {creator.isLive ? (
                    <div>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-4">
                        <img 
                          src={`https://picsum.photos/1280/720?random=${creator.id}`} 
                          alt={`${creator.name} livestream`}
                          className="object-cover w-full h-full opacity-60"
                        />
                        <div className="absolute top-4 left-4 flex items-center">
                          <Badge className="bg-red-500 animate-pulse mr-2">LIVE</Badge>
                          <span className="text-white text-sm flex items-center">
                            <Clock size={14} className="mr-1" /> 1:32:45
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <Button className="bg-red-500 hover:bg-red-600">Join Livestream</Button>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">Current Livestream</h3>
                      <p className="text-gray-500 mb-4">Join {creator.name} for an exclusive Q&A session!</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Tv className="mx-auto mb-2 text-gray-400" size={48} />
                      <h3 className="font-medium text-xl mb-2">Not Currently Live</h3>
                      <p className="text-gray-500 mb-4">
                        {creator.name} isn't streaming right now. Subscribe to get notified when they go live!
                      </p>
                      <Button variant="outline">Get Notified</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exclusives" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Lock className="mx-auto mb-4 text-primary" size={36} />
                    <h3 className="font-medium text-xl mb-3">Premium Exclusive Content</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Subscribe to unlock exclusive content including private photos, 
                      personal video calls, and custom content.
                    </p>
                    <Button onClick={handleSubscribe} className="bg-gradient-to-r from-purple-500 to-pink-500">
                      Subscribe Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Subscription Info */}
        <div className="space-y-6">
          {/* Use the SubscriptionCard component */}
          <SubscriptionCard 
            creator={creator}
            onSubscribe={handleSubscribe}
            onMessage={handleSendMessage}
          />
          
          {/* Use the CreatorStatistics component */}
          <CreatorStatistics creator={creator} />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatorDetail;
