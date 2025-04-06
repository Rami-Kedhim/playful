
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AIProfile } from '@/types/ai-profile';
import { MessageSquare, Gift, Image, Video, CreditCard, Lock, Star } from 'lucide-react';
import AIModelBoost from './AIModelBoost';
import AIProfileConversation from './AIProfileConversation';
import AIProfileGallery from './AIProfileGallery';
import AIProfileGiftSection from './AIProfileGiftSection';
import AIProfileVideoSection from './AIProfileVideoSection';
import AIProfileSubscription from './AIProfileSubscription';

interface AIProfileDetailProps {
  profile: AIProfile;
}

const AIProfileDetail: React.FC<AIProfileDetailProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = React.useState('chat');
  
  // Function to handle profile boost completion
  const handleBoostComplete = () => {
    // In a real application, we might refresh the profile data 
    // or update the UI to show the boosted status
    console.log("Profile boost completed for:", profile.id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left column: Profile info & monetization options */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{profile.name}, {profile.age}</CardTitle>
                <CardDescription>{profile.location}</CardDescription>
              </div>
              <Badge variant={profile.availability_status === 'online' ? 'default' : 'secondary'}>
                {profile.availability_status || 'offline'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full aspect-square rounded-md overflow-hidden mb-4">
              <img 
                src={profile.avatar_url} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {profile.personality.traits.map((trait, i) => (
                  <Badge key={i} variant="outline">{trait}</Badge>
                ))}
              </div>
              
              <div>
                <h3 className="text-sm font-medium">About</h3>
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Interests</h3>
                <p className="text-sm text-muted-foreground">{profile.interests.join(', ')}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-col items-stretch">
            <div className="grid grid-cols-2 gap-2 w-full mb-2">
              <Button variant="outline" className="w-full">
                <Gift className="mr-2 h-4 w-4" />
                Send Gift
              </Button>
              <Button variant="outline" className="w-full">
                <Star className="mr-2 h-4 w-4" />
                Favorite
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* AIProfileBoost component with correct props */}
        <AIModelBoost 
          profile={profile} 
          onBoostComplete={handleBoostComplete}
        />
        
        {/* AIProfileSubscription component (stub) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Premium Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Monthly</span>
              <span className="text-sm font-medium">{profile.subscription_price || 50} Lucoins</span>
            </div>
            <ul className="text-sm space-y-1">
              <li className="flex items-center">
                <Lock className="h-3 w-3 mr-2 text-muted-foreground" />
                Unlock all premium photos
              </li>
              <li className="flex items-center">
                <Lock className="h-3 w-3 mr-2 text-muted-foreground" />
                Unlock all premium videos
              </li>
              <li className="flex items-center">
                <Lock className="h-3 w-3 mr-2 text-muted-foreground" />
                Priority messaging
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Right column: Interaction tabs */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="pb-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="chat" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center">
                  <Image className="h-4 w-4 mr-2" />
                  Photos
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="gifts" className="flex items-center">
                  <Gift className="h-4 w-4 mr-2" />
                  Gifts
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="pt-4">
            <TabsContent value="chat" className="mt-0">
              {/* This would be the chat interface component */}
              <div className="h-[600px] flex flex-col">
                <AIProfileConversation profileId={profile.id} />
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="mt-0">
              {/* Gallery component */}
              <div className="h-[600px] flex flex-col">
                <AIProfileGallery 
                  profileId={profile.id} 
                  images={profile.gallery_images} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="mt-0">
              {/* Videos component */}
              <div className="h-[600px] flex flex-col">
                <AIProfileVideoSection profileId={profile.id} />
              </div>
            </TabsContent>
            
            <TabsContent value="gifts" className="mt-0">
              {/* Gifts component */}
              <div className="h-[600px] flex flex-col">
                <AIProfileGiftSection 
                  profileId={profile.id}
                  giftPreferences={profile.gift_preferences || []}
                />
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIProfileDetail;
