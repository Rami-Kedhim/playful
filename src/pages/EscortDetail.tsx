
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Zap } from 'lucide-react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import EscortProfileCard from '@/components/escorts/EscortProfileCard';
import { Escort } from '@/types/escort';

const EscortDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEscortById, loadEscorts, state } = useEscortContext();
  const [isLoading, setIsLoading] = useState(true);
  const [escort, setEscort] = useState<Escort | null>(null);
  const [similarEscorts, setSimilarEscorts] = useState<Escort[]>([]);
  
  useEffect(() => {
    const fetchEscort = async () => {
      try {
        setIsLoading(true);
        
        // First check if we have the escort already loaded
        let escortData = getEscortById(id as string);
        
        if (!escortData) {
          // If not, load escorts data
          await loadEscorts(true);
          escortData = getEscortById(id as string);
        }
        
        if (escortData) {
          setEscort(escortData);
          
          // Find similar escorts (same location or similar services)
          const similar = state.escorts
            .filter(e => e.id !== id)
            .filter(e => 
              e.location === escortData?.location || 
              e.services?.some(s => escortData?.services?.includes(s))
            )
            .slice(0, 4);
            
          setSimilarEscorts(similar);
        } else {
          console.error("Escort not found");
        }
      } catch (error) {
        console.error("Error loading escort:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchEscort();
    }
  }, [id, getEscortById, loadEscorts, state.escorts]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!escort) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">Escort Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The escort profile you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate('/escorts')}>
            View All Escorts
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <EscortProfileCard escort={escort} />
        </div>
        
        <div className="space-y-6">
          {/* Contact information */}
          <div className="bg-background rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-3">Contact Information</h3>
            {escort.contactInfo ? (
              <div className="space-y-2">
                {escort.contactInfo.phone && (
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{escort.contactInfo.phone}</div>
                  </div>
                )}
                {escort.contactInfo.email && (
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{escort.contactInfo.email}</div>
                  </div>
                )}
                {escort.contactInfo.website && (
                  <div>
                    <div className="text-sm text-muted-foreground">Website</div>
                    <a href={escort.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-medium">
                      {escort.contactInfo.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No contact information provided.</p>
            )}
          </div>
          
          {/* Similar escorts */}
          {similarEscorts.length > 0 && (
            <div className="bg-background rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-3">Similar Escorts</h3>
              <div className="space-y-3">
                {similarEscorts.map(similar => (
                  <div 
                    key={similar.id} 
                    className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => navigate(`/escorts/${similar.id}`)}
                  >
                    <img 
                      src={similar.imageUrl} 
                      alt={similar.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{similar.name}</h4>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>{similar.age} years</span>
                        <span>•</span>
                        <span>{similar.location}</span>
                      </div>
                    </div>
                    {similar.featured && (
                      <div className="ml-auto">
                        <Zap className="h-4 w-4 text-yellow-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Calls to action */}
          <div className="space-y-3">
            <Button className="w-full">Book Now</Button>
            <Button variant="outline" className="w-full">Leave a Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortDetail;
