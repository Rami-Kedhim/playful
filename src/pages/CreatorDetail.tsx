
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useCreatorDetail } from "@/hooks/useCreatorDetail";
import CreatorsModule from "@/modules/creators/CreatorsModule";
import MainLayout from "@/components/layout/MainLayout";
import CreatorHeader from "@/components/creators/detail/CreatorHeader";
import CreatorTabs from "@/components/creators/detail/CreatorTabs";
import CreatorSubscriptionCard from "@/components/creators/detail/CreatorSubscriptionCard";

const CreatorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Creator ID is missing</div>;
  }

  // Remove children prop from CreatorsModule usage since it doesn't accept children
  return (
    <CreatorsModule>
      <CreatorDetailContent creatorId={id} />
    </CreatorsModule>
  );
};

interface CreatorDetailContentProps {
  creatorId: string;
}

const CreatorDetailContent: React.FC<CreatorDetailContentProps> = ({ creatorId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    creator,
    isLoading,
    error,
    isFavorite,
    isSubscribed,
    canSubscribe,
    handleSubscribe,
    handleSendTip,
  } = useCreatorDetail(creatorId);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Creator profile link copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Skeleton className="h-96 w-full rounded-xl" />
              </div>

              <div className="md:col-span-1">
                <Skeleton className="h-80 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !creator) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="bg-red-500/10 border border-red-500 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Creator Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {error || "The creator profile you're looking for doesn't exist or has been removed."}
            </p>
            <Button onClick={() => navigate("/creators")}>Browse Other Creators</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${creator.name} - Content Creator | Subscribe for Exclusive Content`}</title>
        <meta
          name="description"
          content={`${creator.name} - Subscribe to access exclusive photos, videos, and live streams. Starting at $${creator.price ?? 0}/month.`}
        />
      </Helmet>

      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <CreatorHeader creator={creator} isSubscribed={isSubscribed} isFavorite={isFavorite} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2">
              <CreatorTabs creator={creator} isSubscribed={isSubscribed} />
            </div>

            <div className="md:col-span-1">
              <CreatorSubscriptionCard
                creator={creator}
                isSubscribed={isSubscribed}
                canSubscribe={canSubscribe}
                onSubscribe={handleSubscribe}
                onSendTip={handleSendTip}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CreatorDetail;

