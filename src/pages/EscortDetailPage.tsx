import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UnifiedLayout } from '@/layouts';
import { useEscortDetail } from '@/hooks/useEscortDetail';
import EscortProfile from '@/components/escorts/EscortProfile';
import EscortContactCard from '@/components/escorts/EscortContactCard';
import EscortPhotosGallery from '@/components/escorts/EscortPhotosGallery';
import EscortServicesTable from '@/components/escorts/EscortServicesTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EscortReviewsSection from '@/components/escorts/EscortReviewsSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
// Use the consistent casing for the import
import { Escort } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';

const EscortDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { escort, loading, error } = useEscortDetail(id as string);
  const { toast } = useToast();
  const [favorited, setFavorited] = useState(false);
  
  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    setFavorited(prev => !prev);
    
    toast({
      title: favorited ? "Removed from favorites" : "Added to favorites",
      description: favorited 
        ? "This escort has been removed from your favorites" 
        : "This escort has been added to your favorites",
      variant: favorited ? "default" : "default",
    });
  };
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return (
      <UnifiedLayout title="Loading..." showBreadcrumbs>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </UnifiedLayout>
    );
  }
  
  if (error || !escort) {
    return (
      <UnifiedLayout title="Error" showBreadcrumbs>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Escort not found</h2>
          <p className="text-muted-foreground mb-6">
            The escort you're looking for might have been removed or doesn't exist.
          </p>
          <Link to="/escorts">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Escorts
            </Button>
          </Link>
        </div>
      </UnifiedLayout>
    );
  }
  
  return (
    <UnifiedLayout 
      title={`${escort.name}, ${escort.age} - ${escort.city}`} 
      description={`${escort.shortDescription || 'Escort services in ' + escort.city}`}
      showBreadcrumbs
    >
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EscortProfile escort={escort} onFavoriteToggle={handleFavoriteToggle} isFavorite={favorited} />
            <EscortPhotosGallery photos={escort.photos || []} />
            <EscortServicesTable services={escort.services || []} rates={escort.rates || {}} />
            <EscortReviewsSection escortId={escort.id} reviews={escort.reviews || []} />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <EscortContactCard 
              escort={escort} 
              onContactRequest={() => {
                toast({
                  title: "Contact Request Sent",
                  description: `Your request has been sent to ${escort.name}`,
                });
              }} 
            />
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default EscortDetailPage;
