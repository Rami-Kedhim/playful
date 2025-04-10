
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ContentStatusBadge from './ContentStatusBadge';
import ContentExpiryInfo from './ContentExpiryInfo';
import { calculateExpiryDate, calculateRenewalCost } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';

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
  };
  onRenew: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onRenew }) => {
  const expiresAt = calculateExpiryDate(item.createdAt);
  const lucoinCost = calculateRenewalCost(item.status, item.type);
  
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
        {item.status !== 'draft' && (
          <ContentExpiryInfo 
            createdAt={item.createdAt} 
            expiresAt={expiresAt} 
            onRenew={() => onRenew(item.id)}
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
