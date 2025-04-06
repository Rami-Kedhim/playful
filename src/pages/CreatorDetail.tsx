
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import useCreators, { Creator } from "@/hooks/useCreators";
import ContentCreatorHero from "@/components/creators/detail/ContentCreatorHero";
import SubscriptionCard from "@/components/creators/detail/SubscriptionCard";
import CreatorStatistics from "@/components/creators/detail/CreatorStatistics";
import ContentTabs from "@/components/creators/detail/ContentTabs";

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

  return (
    <>
      <Helmet>
        {creator ? (
          <>
            <title>{creator.name} - Creator Profile | Premium Directory</title>
            <meta name="description" content={`${creator.name} - Content creator from ${creator.location}. Subscribe for exclusive content.`} />
          </>
        ) : (
          <title>Creator Profile | Premium Directory</title>
        )}
      </Helmet>

      <MainLayout>
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="w-full h-[400px] rounded-lg" />
            </div>
            <div>
              <Skeleton className="w-full h-[200px] rounded-lg mb-6" />
              <Skeleton className="w-full h-[300px] rounded-lg" />
            </div>
          </div>
        ) : !creator ? (
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-2">Creator Not Found</h2>
            <p className="text-gray-500 mb-4">The creator you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        ) : (
          <>
            <ContentCreatorHero 
              creator={creator}
              isFavorited={isFavorited}
              onToggleFavorite={toggleFavorite}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Left Column - Content Tabs */}
              <div className="lg:col-span-2">
                <ContentTabs creator={creator} handleSubscribe={handleSubscribe} />
              </div>
              
              {/* Right Column - Subscription Info */}
              <div className="space-y-6">
                <SubscriptionCard 
                  creator={creator}
                  onSubscribe={handleSubscribe}
                  onMessage={handleSendMessage}
                />
                
                <CreatorStatistics creator={creator} />
              </div>
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default CreatorDetail;
