
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ContentStatusBadge from './ContentStatusBadge';
import ContentExpiryInfo from './ContentExpiryInfo';
import { calculateExpiryDate, calculateRenewalCost } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { useContentBrainHub } from '@/hooks/useContentBrainHub';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface ContentCardProps {
  item: {
    id: string;
    title: string;
    type: string;
    createdAt: Date;
    url?: string;
    content?: string;
    status: string;
    daysRemaining?: number;
    brainHubProcessed?: boolean;
    optimizationScore?: number;
    recommendedActions?: string[];
  };
  onRenew: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onRenew }) => {
  const expiresAt = calculateExpiryDate(item.createdAt);
  const { getIntelligentRenewalCost, recordInteraction } = useContentBrainHub();
  
  // Try to use intelligent pricing first, fall back to standard calculation
  const lucoinCost = getIntelligentRenewalCost(item.status, item.type);
  
  // Record view interaction with Brain Hub when component mounts
  useEffect(() => {
    recordInteraction(item.id, 'view');
  }, [item.id, recordInteraction]);
  
  // Handle renew button click with Brain Hub tracking
  const handleRenew = () => {
    recordInteraction(item.id, 'renew');
    onRenew(item.id);
  };
  
  return (
    <Card key={item.id} className="overflow-hidden">
      {item.type !== 'text' && (
        <div className="relative aspect-video bg-muted">
          <img 
            src={item.url} 
            alt={item.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <ContentStatusBadge 
              status={item.status as any}
              daysRemaining={item.status === 'expiring' ? item.daysRemaining : undefined}  
            />
          </div>
          
          {item.brainHubProcessed && item.optimizationScore && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Optimized {item.optimizationScore.toFixed(1)}</span>
              </Badge>
            </div>
          )}
        </div>
      )}
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{item.title}</h3>
          {item.type === 'text' && (
            <ContentStatusBadge 
              status={item.status as any}
              daysRemaining={item.status === 'expiring' ? item.daysRemaining : undefined} 
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </p>
        {item.type === 'text' && (
          <p className="text-sm border p-2 rounded-md bg-muted/30">
            {item.content}
          </p>
        )}
        
        {item.recommendedActions && item.recommendedActions.length > 0 && (
          <div className="text-xs p-2 rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
            <p className="font-medium mb-1 text-blue-700 dark:text-blue-300">Brain Hub Recommendations:</p>
            <ul className="list-disc ml-4 text-muted-foreground space-y-1">
              {item.recommendedActions.slice(0, 2).map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>
        )}
        
        {item.status !== 'draft' && (
          <ContentExpiryInfo 
            createdAt={item.createdAt} 
            expiresAt={expiresAt} 
            onRenew={handleRenew}
            lucoinCost={lucoinCost}
          />
        )}
        {item.status === 'draft' && (
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md text-sm border border-gray-200 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">
              Draft content - not yet published
            </span>
            <Button variant="secondary" size="sm">Publish</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentCard;
