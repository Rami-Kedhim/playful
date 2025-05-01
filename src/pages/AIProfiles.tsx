
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIProfile } from '@/types/ai-profile';

// Define an extended AIProfile type for this component
interface ExtendedAIProfile extends AIProfile {
  bio?: string;
}

// Mock data for the component with correct type structure
const mockAIProfiles: ExtendedAIProfile[] = [
  {
    id: '1',
    name: 'Sophia',
    avatarUrl: '/assets/ai-profiles/sophia.jpg',
    imageUrl: '/assets/ai-profiles/sophia.jpg',
    bio: 'An AI companion who loves deep conversations and philosophy.',
    personality: ['flirty', 'charming', 'witty']
  },
  {
    id: '2',
    name: 'Alex',
    avatarUrl: '/assets/ai-profiles/alex.jpg',
    imageUrl: '/assets/ai-profiles/alex.jpg',
    bio: 'Tech enthusiast and coding partner for your programming projects.',
    personality: ['geeky', 'helpful', 'playful']
  }
];

const AIProfiles = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>AI Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAIProfiles.map(profile => (
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
                        {Array.isArray(profile.personality) 
                          ? profile.personality[0] 
                          : typeof profile.personality === 'object' 
                            ? profile.personality.type 
                            : ''}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {profile.bio}
                      </p>
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

export default AIProfiles;
