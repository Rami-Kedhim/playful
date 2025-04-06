import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { useEscortDetail } from "@/hooks/useEscortDetail";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import ProfileInfo from "@/components/escorts/detail/ProfileInfo";
import ProfileTabs from "@/components/escorts/detail/ProfileTabs";
import EscortImageGallery from "@/components/escorts/detail/EscortImageGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const EscortDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { escort, loading, error } = useEscortDetail(id);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showSuccess } = useNotifications();
  
  const [bookingOpen, setBookingOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const handleFavoriteToggle = () => {
    if (escort) {
      toggleFavorite(escort.id);
    }
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    setShareOpen(true);
    navigator.clipboard.writeText(window.location.href);
    if (showSuccess) showSuccess("Link Copied", "Profile link copied to clipboard");
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
              <EscortImageGallery 
                images={escort.gallery || escort.gallery_images || [escort.imageUrl || escort.avatar_url || '']} 
                name={escort.name}
              />
              
              <div className="mt-8">
                <ProfileTabs escort={escort} />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <ProfileInfo 
                escort={escort}
                onFavoriteToggle={handleFavoriteToggle}
                onBookingOpen={() => setBookingOpen(true)}
                onMessageOpen={() => setMessageOpen(true)}
                onShareOpen={() => setShareOpen(true)}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default EscortDetail;
