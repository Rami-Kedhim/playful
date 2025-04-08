
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Bot, FileQuestion } from 'lucide-react';

type ProfileType = 'verified' | 'ai' | 'provisional';

interface ProfileTypeBadgeProps {
  type: ProfileType;
  className?: string;
}

const ProfileTypeBadge: React.FC<ProfileTypeBadgeProps> = ({ type, className }) => {
  // Configure badge based on profile type
  const badgeConfig = {
    verified: {
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
      text: 'Verified',
      variant: 'success' as const,
      className: 'bg-green-500 text-white'
    },
    ai: {
      icon: <Bot className="h-3 w-3 mr-1" />,
      text: 'AI Model',
      variant: 'outline' as const,
      className: 'bg-purple-500 text-white'
    },
    provisional: {
      icon: <FileQuestion className="h-3 w-3 mr-1" />,
      text: 'Provisional',
      variant: 'outline' as const,
      className: 'bg-amber-500 text-white'
    }
  };

  const config = badgeConfig[type];

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} flex items-center ${className || ''}`}
    >
      {config.icon}
      {config.text}
    </Badge>
  );
};

export default ProfileTypeBadge;
