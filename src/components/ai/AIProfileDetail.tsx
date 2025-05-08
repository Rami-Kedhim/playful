
import React from 'react';
import AICompanionChat from './AICompanionChat';

interface AIProfileDetailProps {
  profile: {
    id: string;
    name: string;
    avatarUrl: string;
    personalityType?: string;
    description?: string;
  };
  onClose?: () => void;
}

const AIProfileDetail: React.FC<AIProfileDetailProps> = ({
  profile,
  onClose
}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{profile.name}</h2>
      
      {profile.description && (
        <p className="mb-4 text-muted-foreground">{profile.description}</p>
      )}
      
      <div className="h-[400px] border rounded-lg">
        <AICompanionChat
          aiName={profile.name}
          aiAvatarUrl={profile.avatarUrl}
          aiDescription={profile.description}
          initialMessage={`Hello! I'm ${profile.name}. How can I assist you today?`}
        />
      </div>
    </div>
  );
};

export default AIProfileDetail;
