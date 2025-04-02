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
import { CalendarDays, Clock, Heart, Image as ImageIcon, Lock, MessageSquare, Video, Star } from "lucide-react";
import StarRating from "@/components/ui/StarRating";

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile and Content */}
        <div className="lg:col-span-2">
          {/* Cover Image / Banner */}
          <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg overflow-hidden mb-16">
            <div className="absolute -bottom-12 left-6 flex items-end">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={creator.imageUrl} alt={creator.name} />
                <AvatarFallback>{creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mb-2">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-white">{creator.name}</h1>
                  {creator.isLive && (
                    <Badge className="ml-2 bg-red-500 animate-pulse">LIVE</Badge>
                  )}
                  {creator.isAI && (
                    <Badge className="ml-2 bg-blue-500">AI</Badge>
                  )}
                </div>
                <p className="text-white/90">@{creator.username}</p>
              </div>
            </div>
            <Button
              className={`absolute top-4 right-4 ${isFavorited ? "bg-red-500 hover:bg-red-600" : ""}`}
              size="sm"
              onClick={toggleFavorite}
            >
              <Heart className="mr-1" size={16} fill={isFavorited ? "white" : "none"} />
              {isFavorited ? "Favorited" : "Add to Favorites"}
            </Button>
          </div>

          {/* Tabs for Content */}
          <Tabs defaultValue="about" className="mt-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">About Me</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">{creator.bio}</p>
                  
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
                      <CalendarDays className="mb-1 text-green-500" size={20} />
                      <span className="font-semibold">2 years</span>
                      <span className="text-xs text-gray-500">Member</span>
                    </div>
                  </div>
                  
                  {creator.tags && creator.tags.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Interests</h4>
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
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Photos</h3>
                    <Badge variant="outline" className="font-normal">
                      {creator.contentCount.photos} photos
                    </Badge>
                  </div>
                  
                  {creator.isPremium ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {/* First 6 photos are previews */}
                      {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-muted">
                          <img 
                            src={`https://picsum.photos/300/300?random=${creator.id}${i}`} 
                            alt={`${creator.name} content`}
                            className="object-cover w-full h-full"
                          />
                          {i > 2 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Lock className="text-white" size={24} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {/* Show some sample photos */}
                      {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-muted">
                          <img 
                            src={`https://picsum.photos/300/300?random=${creator.id}${i}`} 
                            alt={`${creator.name} content`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 text-center">
                    <Button disabled={!creator.isPremium}>
                      {creator.isPremium ? "View All Photos" : "No Premium Content"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Videos</h3>
                    <Badge variant="outline" className="font-normal">
                      {creator.contentCount.videos} videos
                    </Badge>
                  </div>
                  
                  {creator.isPremium ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First 4 videos are previews */}
                      {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="relative aspect-video rounded-md overflow-hidden bg-muted">
                          <img 
                            src={`https://picsum.photos/640/360?random=${creator.id}${i}`} 
                            alt={`${creator.name} video content`}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button variant="ghost" size="icon" className="bg-black/30 rounded-full h-12 w-12">
                              <Video className="text-white" size={24} />
                            </Button>
                          </div>
                          {i > 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Lock className="text-white" size={24} />
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                            {Math.floor(Math.random() * 10) + 2}:
                            {Math.floor(Math.random() * 50) + 10}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lock className="mx-auto mb-2 text-gray-400" size={32} />
                      <h3 className="font-medium text-lg mb-1">Premium Content</h3>
                      <p className="text-gray-500 mb-4">Subscribe to unlock all videos</p>
                    </div>
                  )}
                  
                  <div className="mt-4 text-center">
                    <Button disabled={!creator.isPremium}>
                      {creator.isPremium ? "View All Videos" : "No Premium Content"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
                      <Video className="mx-auto mb-2 text-gray-400" size={48} />
                      <h3 className="font-medium text-xl mb-2">Not Currently Live</h3>
                      <p className="text-gray-500 mb-4">
                        {creator.name} isn't streaming right now. Check back later or subscribe to get notified when they go live.
                      </p>
                      <Button variant="outline">Get Notified</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Subscription Info */}
        <div className="space-y-6">
          {/* Subscription Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Premium Subscription</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">{creator.price}</span>
                  <span className="ml-1 text-gray-500">LC/month</span>
                </div>
                
                <Badge className="flex items-center">
                  <Lock size={12} className="mr-1" /> Premium
                </Badge>
              </div>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                      <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Full access to {creator.contentCount.photos} photos</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                      <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Unlimited access to {creator.contentCount.videos} videos</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                      <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Priority messaging</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                      <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Exclusive livestream access</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button onClick={handleSubscribe} className="w-full">
                  Subscribe Now
                </Button>
                <Button variant="outline" className="w-full" onClick={handleSendMessage}>
                  <MessageSquare size={16} className="mr-2" />
                  Message Creator
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Profile Statistics */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <span className="font-bold text-lg">{creator.subscriberCount.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">Subscribers</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <span className="font-bold text-lg">{Math.floor(Math.random() * 5000) + 1000}</span>
                  <span className="text-xs text-gray-500">Profile Views</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <span className="font-bold text-lg">{creator.contentCount.photos + creator.contentCount.videos}</span>
                  <span className="text-xs text-gray-500">Total Content</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                  <span className="font-bold text-lg">{Math.floor(Math.random() * 12) + 1}</span>
                  <span className="text-xs text-gray-500">Months Active</span>
                </div>
              </div>
              
              <ProfileCompleteness completeness={85} />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatorDetail;
