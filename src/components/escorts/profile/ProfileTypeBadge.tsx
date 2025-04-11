
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Bot, 
  FileQuestion, 
  Lock, 
  Shield
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProfileType = 'verified' | 'ai' | 'provisional' | 'private' | 'protected';

interface ProfileTypeBadgeProps {
  type: ProfileType;
  className?: string;
  showTooltip?: boolean;
}

const ProfileTypeBadge: React.FC<ProfileTypeBadgeProps> = ({ 
  type, 
  className,
  showTooltip = true
}) => {
  // Configure badge based on profile type
  const badgeConfig = {
    verified: {
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
      text: 'Verified',
      variant: 'success' as const,
      className: 'bg-green-500 text-white',
      tooltip: 'This profile is fully verified with real photos'
    },
    ai: {
      icon: <Bot className="h-3 w-3 mr-1" />,
      text: 'AI Avatar',
      variant: 'secondary' as const,
      className: 'bg-purple-500 text-white',
      tooltip: 'This profile uses AI-generated images to protect privacy, but is still verified'
    },
    provisional: {
      icon: <FileQuestion className="h-3 w-3 mr-1" />,
      text: 'Provisional',
      variant: 'warning' as const,
      className: 'bg-amber-500 text-white',
      tooltip: 'This profile is currently pending full verification'
    },
    private: {
      icon: <Lock className="h-3 w-3 mr-1" />,
      text: 'Private',
      variant: 'outline' as const,
      className: 'border-purple-500 text-purple-700 bg-purple-50',
      tooltip: 'This person has chosen to keep their identity private'
    },
    protected: {
      icon: <Shield className="h-3 w-3 mr-1" />,
      text: 'Protected',
      variant: 'outline' as const,
      className: 'border-blue-500 text-blue-700 bg-blue-50',
      tooltip: 'Privacy-protected profile with AI-generated images'
    }
  };

  const config = badgeConfig[type];

  const badge = (
    <Badge 
      variant={config.variant} 
      className={`${config.className} flex items-center ${className || ''}`}
    >
      {config.icon}
      {config.text}
    </Badge>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>{config.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
};

export default ProfileTypeBadge;
