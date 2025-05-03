
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/layouts';
import { useEscortProfile } from '@/hooks/useEscortProfile';
import EscortProfile from '@/components/escorts/detail/EscortProfile';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, ArrowLeft, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EscortDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { escort, loading, error } = useEscortProfile();
  
  const [bookingVisible, setBookingVisible] = useState(false);
  
  const handleBookNow = () => {
    setBookingVisible(true);
  };
  
  if (loading) {
    return (
      <Layout title="Loading Profile" showBreadcrumbs>
        <div className="container mx-auto py-6">
          <div className="flex items-center space-x-2 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/escorts">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Listings
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-[500px] w-full rounded-md" />
            </div>
            <div>
              <Skeleton className="h-24 w-full mb-4 rounded-md" />
              <Skeleton className="h-36 w-full mb-4 rounded-md" />
              <Skeleton className="h-10 w-full mb-4 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !escort) {
    return (
      <Layout title="Profile Not Found" showBreadcrumbs>
        <div className="container mx-auto py-6">
          <div className="flex items-center space-x-2 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/escorts">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Listings
              </Link>
            </Button>
          </div>
          
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Profile Not Found</AlertTitle>
            <AlertDescription>
              The escort profile you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
          
          <Button asChild>
            <Link to="/escorts">Browse Other Escorts</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={escort.name} description={`${escort.age} years old • ${escort.location}`} showBreadcrumbs>
      <div className="container mx-auto py-6">
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/escorts">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Listings
            </Link>
          </Button>
          
          {escort.verified && (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Verified
            </div>
          )}
        </div>
        
        <EscortProfile escort={escort} onBookNow={handleBookNow} />
        
        <div className="mt-8 bg-muted/50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-lg">Safety First</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            UberEscorts is committed to your safety. We recommend verifying the identity of anyone you plan to meet,
            sharing your location with a friend, and meeting in public spaces first.
          </p>
          <Button variant="outline" asChild>
            <Link to="/safety">View Safety Guidelines</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EscortDetailPage;
