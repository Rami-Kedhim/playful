import { useState } from "react";
import { AIProfile } from "@/types/ai-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import AIProfileConversation from "./AIProfileConversation";
import AIProfileGallery from "./AIProfileGallery";
import AIProfileGiftSection from "./AIProfileGiftSection";
import AIProfileVideoSection from "./AIProfileVideoSection";
import AIProfileSubscription from "./AIProfileSubscription";
import { toast } from "@/hooks/use-toast";
import AIModelBoost from "./AIModelBoost";
import { Calendar, Clock, MapPin, Flame } from "lucide-react";
import AIProfileTypeIndicator from "./AIProfileTypeIndicator";
import AIPersonalityTraits from "./AIPersonalityTraits";
import AIEmotionStatus from "./AIEmotionStatus";
import { PersonalityTrait, AIPersonalityConversation } from "@/types/ai-personality";

interface AIProfileDetailProps {
  profile: AIProfile;
}

const AIProfileDetail: React.FC<AIProfileDetailProps> = ({ profile }) => {
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  
  const handleSubscribe = () => {
    toast({
      title: "Subscription Started",
      description: `You are now subscribed to ${profile.name}'s premium content!`,
    });
    setSubscribeDialogOpen(false);
  };
  
  const handleBoostComplete = () => {
    toast({
      title: "Boost Complete",
      description: `You've successfully boosted ${profile.name}'s profile!`,
    });
  };

  const isPremium = profile.subscription_price || (profile.boost_status?.is_boosted);

  const getPersonalityTraits = (): PersonalityTrait[] => {
    if (!profile.personality?.traits) return [];
    
    if (typeof profile.personality.traits[0] === 'object') {
      return profile.personality.traits as PersonalityTrait[];
    }
    
    return (profile.personality.traits as string[]).map(trait => ({
      name: trait,
      description: '',
      intensity: 75
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={profile.avatar_url} alt={profile.name} />
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">
                      {profile.name}, {profile.age}
                    </h1>
                    <AIProfileTypeIndicator type={isPremium ? 'premium' : 'ai'} />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                    
                    {profile.availability_status && (
                      <span className="ml-4 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className={
                          profile.availability_status === "online" 
                            ? "text-green-500" 
                            : profile.availability_status === "away" 
                              ? "text-amber-500" 
                              : "text-gray-500"
                        }>
                          {profile.availability_status.charAt(0).toUpperCase() + profile.availability_status.slice(1)}
                        </span>
                      </span>
                    )}
                    
                    {profile.last_active && (
                      <span className="ml-4 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Active {new Date(profile.last_active).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {profile.boost_status?.is_boosted && (
                  <Button variant="outline" size="sm" className="text-amber-500">
                    <Flame className="h-4 w-4 mr-1 text-amber-500" />
                    Boosted
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests?.map(interest => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>

            {profile.personality?.traits && profile.personality.traits.length > 0 && (
              <div className="mt-4">
                <AIPersonalityTraits traits={getPersonalityTraits()} compact />
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-4">
            <AIProfileConversation profile={profile} />
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-4">
            <AIProfileGallery profile={profile} />
          </TabsContent>
          
          <TabsContent value="video" className="mt-4">
            <AIProfileVideoSection profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="space-y-6">
        <AIProfileSubscription 
          profile={profile} 
          onSubscribe={() => setSubscribeDialogOpen(true)} 
        />
        
        <AIModelBoost 
          profile={profile} 
          onBoostComplete={handleBoostComplete} 
        />
        
        <AIProfileGiftSection profile={profile} />
      </div>
      
      <Dialog open={subscribeDialogOpen} onOpenChange={setSubscribeDialogOpen}>
        <DialogContent>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">
              Subscribe to {profile.name}
            </h2>
            
            <p>
              You're about to subscribe to {profile.name}'s premium content for {profile.subscription_price || 29} LC per month.
            </p>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setSubscribeDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubscribe}>
                Confirm Subscription
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIProfileDetail;
