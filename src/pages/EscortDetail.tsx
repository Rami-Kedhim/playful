
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useEscortDetail } from "@/hooks/useEscortDetail";
import { EscortsModule } from "@/modules/escorts/EscortsModule";
import MainLayout from "@/components/layout/MainLayout";
import EscortGallery from "@/components/escorts/detail/EscortGallery";
import EscortDetailTabs from "@/components/escorts/detail/EscortDetailTabs";
import EscortQuickActions from "@/components/escorts/detail/EscortQuickActions";
import EscortContactCard from "@/components/escorts/detail/EscortContactCard";

const EscortDetail: React.FC = () => {
  return (
    <EscortsModule>
      <EscortDetailContent />
    </EscortsModule>
  );
};

const EscortDetailContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    escort, 
    loading, 
    error, 
    isFavorite, 
    isBookingAvailable,
    isMessagingAvailable,
    handleBook,
    handleMessage
  } = useEscortDetail(id);
  
  const [bookingOpen, setBookingOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Profile link copied to clipboard"
    });
  };
  
  // Handle booking modal open with wallet check
  const handleBookNowClick = () => {
    if (!isBookingAvailable) {
      toast({
        title: "Insufficient funds",
        description: "Please add more Lucoins to your wallet to book this escort",
        variant: "destructive"
      });
      return;
    }
    setBookingOpen(true);
  };
  
  // Handle message modal open with wallet check
  const handleMessageClick = () => {
    if (!isMessagingAvailable) {
      toast({
        title: "Insufficient funds",
        description: "Please add more Lucoins to your wallet to message this escort",
        variant: "destructive"
      });
      return;
    }
    setMessageOpen(true);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
            
            <div className="md:col-span-1">
              <Skeleton className="h-[200px] w-full mb-4 rounded-xl" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !escort) {
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
            <h2 className="text-2xl font-bold text-red-500 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {error || "The escort profile you're looking for doesn't exist or has been removed."}
            </p>
            <Button onClick={() => navigate('/escorts')}>
              Browse Other Profiles
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{`${escort.name} - Escort Profile | Premium Directory`}</title>
        <meta name="description" content={`${escort.name} - ${escort.age} years old escort from ${escort.location}. View photos, services, and booking information.`} />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to search
            </Button>
            
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EscortGallery escort={escort} />
              
              <EscortQuickActions 
                escort={escort}
                isFavorite={isFavorite}
                onBookNow={handleBookNowClick}
                onMessage={handleMessageClick}
              />
              
              <div className="mt-8">
                <EscortDetailTabs escort={escort} />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <EscortContactCard 
                escort={escort}
                isBookingAvailable={isBookingAvailable}
                isMessagingAvailable={isMessagingAvailable}
                onBookNow={handleBookNowClick}
                onMessage={handleMessageClick}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default EscortDetail;
