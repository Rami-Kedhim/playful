
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useAIModelMonetization } from "@/hooks/ai/useAIModelMonetization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Image, VideoIcon, MessageSquare, Coins } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface AIPremiumContent {
  id: string;
  profile_id: string;
  type: 'photo' | 'video' | 'message';
  title: string;
  description?: string;
  content_url: string;
  thumbnail_url?: string;
  price: number;
  created_at: string;
}

interface AIModelPremiumContentProps {
  profileId: string;
}

const AIModelPremiumContent = ({ profileId }: AIModelPremiumContentProps) => {
  const [premiumContent, setPremiumContent] = useState<AIPremiumContent[]>([]);
  const [purchasedContent, setPurchasedContent] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('photos');
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();
  const { purchaseAIContent, fetchPurchasedContent, isProcessing } = useAIModelMonetization();
  
  useEffect(() => {
    fetchContent();
  }, [profileId]);
  
  useEffect(() => {
    if (user) {
      fetchUserPurchases();
    }
  }, [user]);
  
  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_premium_content')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPremiumContent(data || []);
    } catch (error) {
      console.error("Error fetching premium content:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUserPurchases = async () => {
    if (!user) return;
    
    try {
      const contentIds = await fetchPurchasedContent(user.id);
      setPurchasedContent(contentIds);
    } catch (error) {
      console.error("Error fetching user purchases:", error);
    }
  };
  
  const handlePurchase = async (contentId: string, price: number) => {
    if (!user) return;
    
    const success = await purchaseAIContent(contentId, profileId, price);
    if (success) {
      setPurchasedContent(prev => [...prev, contentId]);
    }
  };
  
  const hasAccess = (contentId: string) => {
    return purchasedContent.includes(contentId);
  };
  
  const getTypeIcon = (type: 'photo' | 'video' | 'message') => {
    switch (type) {
      case 'photo': return <Image className="w-4 h-4" />;
      case 'video': return <VideoIcon className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
    }
  };
  
  const filteredContent = premiumContent.filter(item => item.type === activeTab.slice(0, -1));
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Content</CardTitle>
        <CardDescription>
          Exclusive photos, videos, and messages from this AI model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Image className="w-4 h-4" /> Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <VideoIcon className="w-4 h-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Messages
            </TabsTrigger>
          </TabsList>
          
          {['photos', 'videos', 'messages'].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              {filteredContent.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No {tabValue} available
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredContent.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative aspect-square bg-muted">
                        {item.thumbnail_url ? (
                          <img 
                            src={item.thumbnail_url} 
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {getTypeIcon(item.type)}
                          </div>
                        )}
                        
                        {!hasAccess(item.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <Lock className="w-8 h-8 text-white/80" />
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </CardContent>
                      
                      <CardFooter className="p-3 pt-0">
                        {hasAccess(item.id) ? (
                          <Button variant="outline" className="w-full" disabled>
                            Unlocked
                          </Button>
                        ) : (
                          <Button 
                            variant="default" 
                            className="w-full"
                            onClick={() => handlePurchase(item.id, item.price)}
                            disabled={isProcessing || !user}
                          >
                            <Coins className="w-4 h-4 mr-2" />
                            Unlock ({item.price} LC)
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIModelPremiumContent;
