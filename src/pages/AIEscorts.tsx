
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIProfile } from '@/types/ai-profile';

// Mock data for the component
const mockAIProfiles: AIProfile[] = [
  {
    id: '1',
    name: 'Sophia',
    imageUrl: '/assets/ai-profiles/sophia.jpg',
    personality: { 
      type: 'flirty',
      traits: ['charming', 'witty']
    },
    location: 'Virtual',
    created_at: new Date().toISOString(),
    age: 24,
    boost_status: {
      isActive: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      boost_level: 2
    }
  },
  {
    id: '2',
    name: 'Alex',
    imageUrl: '/assets/ai-profiles/alex.jpg',
    personality: { 
      type: 'dominant',
      traits: ['confident', 'assertive']
    },
    location: 'Virtual',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    age: 28
  },
];

const AIEscorts = () => {
  const sortProfiles = (profiles: AIProfile[]) => {
    return [...profiles].sort((a, b) => {
      // First sort by boost status
      if (a.boost_status?.isActive && !b.boost_status?.isActive) return -1;
      if (!a.boost_status?.isActive && b.boost_status?.isActive) return 1;
      
      // Then by created date (newest first)
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    });
  };

  const profiles = sortProfiles(mockAIProfiles);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>AI Escorts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map(profile => (
              <Card key={profile.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                      {profile.imageUrl && (
                        <img 
                          src={profile.imageUrl} 
                          alt={profile.name} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {profile.personality?.type}
                      </p>
                      <div className="flex items-center mt-1">
                        {profile.boost_status?.isActive && (
                          <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full mr-2">
                            Boosted
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {profile.location}
                        </span>
                      </div>
                      {profile.age && (
                        <span className="text-xs text-muted-foreground">
                          Age: {profile.age}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIEscorts;
