
import React from 'react';
import AICompanionChat from './AICompanionChat';
import { AICompanionChatProps } from './companion-chat/AICompanionChatProps';

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
          companionId={profile.id}
          name={profile.name}
          avatarUrl={profile.avatarUrl}
          personalityType={profile.personalityType}
          initialMessage={`Hello! I'm ${profile.name}. How can I assist you today?`}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default AIProfileDetail;
