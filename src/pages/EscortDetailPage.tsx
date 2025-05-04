
import React from 'react';
import { useParams } from 'react-router-dom';
import { UnifiedLayout } from '@/layouts';
import EscortDetailView from '@/components/escorts/EscortDetailView';
import { Escort } from '@/types/Escort';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for single escort - in a real app this would be fetched based on the ID
const mockEscort: Escort = {
  id: '1',
  name: 'Sophia',
  age: 28,
  gender: 'female',
  location: 'Los Angeles, CA',
  rating: 4.9,
  reviewCount: 47,
  price: 300,
  tags: ['Elite', 'Luxury', 'Verified', 'Travel', 'Events', 'Dinner'],
  imageUrl: 'https://i.pravatar.cc/300?img=1',
  availableNow: true,
  isVerified: true,
  responseRate: 98
};

const EscortDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, fetch escort data based on ID
  
  const handleContactClick = () => {
    alert('Contact functionality would open messaging');
  };
  
  const handleBookingClick = () => {
    alert('Booking functionality would open booking form');
  };
  
  const handleFavoriteClick = () => {
    alert(`Toggle favorite status for escort ${id}`);
  };

  return (
    <UnifiedLayout showBreadcrumbs>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" className="flex items-center" asChild>
            <Link to="/escorts">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Escorts
            </Link>
          </Button>
        </div>
        
        <EscortDetailView
          escort={mockEscort}
          onContactClick={handleContactClick}
          onBookingClick={handleBookingClick}
          onFavoriteClick={handleFavoriteClick}
        />
      </div>
    </UnifiedLayout>
  );
};

export default EscortDetailPage;
