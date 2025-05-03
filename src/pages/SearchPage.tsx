
import React, { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { useAuth } from '@/hooks/auth';

const SearchPage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    // Connect to Hermes when page loads
    hermes.connect({
      system: 'SearchSystem',
      connectionId: `search-page-${Date.now()}`,
      userId,
    });
    
    // Calculate some boost scores for demo profiles
    const profileIds = ['profile-1', 'profile-2', 'profile-3'];
    
    profileIds.forEach(profileId => {
      const boostScore = oxum.calculateBoostScore(profileId);
      console.log(`Profile ${profileId} boost score: ${boostScore}`);
    });
  }, [userId]);

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      
      <div className="bg-card rounded-lg p-6 border">
        <p className="text-lg">
          Search functionality will be displayed here.
        </p>
      </div>
    </Container>
  );
};

export default SearchPage;
