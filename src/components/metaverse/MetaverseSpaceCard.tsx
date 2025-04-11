
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Users, Globe } from 'lucide-react';

interface MetaverseSpaceCardProps {
  id: string;
  title: string;
  description: string;
  themeType?: 'isis' | 'hathor' | 'bastet' | 'nefertiti' | 'anubis'; // Egyptian archetypes
  activeUsers?: number;
  imageUrl?: string;
  onEnter?: () => void;
  className?: string;
}

/**
 * Card component for displaying metaverse spaces
 * Incorporates Sacred Engine themes based on Egyptian archetypes
 */
const MetaverseSpaceCard: React.FC<MetaverseSpaceCardProps> = ({
  id,
  title,
  description,
  themeType = 'hathor',
  activeUsers = 0,
  imageUrl,
  onEnter,
  className
}) => {
  // Theme-specific styling based on Egyptian archetypes
  const getThemeStyles = () => {
    switch (themeType) {
      case 'isis':
        return {
          borderColor: 'border-blue-500/30',
          badgeColor: 'bg-blue-500/10 text-blue-500',
          icon: <span className="text-blue-500">☥</span> // Ankh symbol
        };
      case 'hathor':
        return {
          borderColor: 'border-pink-500/30',
          badgeColor: 'bg-pink-500/10 text-pink-500',
          icon: <span className="text-pink-500">♥</span> // Heart symbol
        };
      case 'bastet':
        return {
          borderColor: 'border-amber-500/30',
          badgeColor: 'bg-amber-500/10 text-amber-500',
          icon: <span className="text-amber-500">◈</span> // Diamond symbol
        };
      case 'nefertiti':
        return {
          borderColor: 'border-purple-500/30',
          badgeColor: 'bg-purple-500/10 text-purple-500',
          icon: <span className="text-purple-500">✧</span> // Star symbol
        };
      case 'anubis':
        return {
          borderColor: 'border-slate-500/30',
          badgeColor: 'bg-slate-500/10 text-slate-500',
          icon: <span className="text-slate-500">✦</span> // Star symbol
        };
      default:
        return {
          borderColor: 'border-primary/30',
          badgeColor: 'bg-primary/10 text-primary',
          icon: <Globe className="h-4 w-4" />
        };
    }
  };
  
  const themeStyles = getThemeStyles();
  
  return (
    <Card className={`${className} transition-all hover:shadow-md ${themeStyles.borderColor}`}>
      <div className="relative">
        {imageUrl && (
          <div 
            className="w-full h-40 bg-cover bg-center rounded-t-lg" 
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        
        <Badge className={`absolute top-2 right-2 ${themeStyles.badgeColor}`}>
          {themeStyles.icon}
          <span className="ml-1">{themeType.charAt(0).toUpperCase() + themeType.slice(1)}</span>
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>{activeUsers} active visitors</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="default" 
          className="w-full" 
          onClick={onEnter}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Enter Virtual Space
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MetaverseSpaceCard;
