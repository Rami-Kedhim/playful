
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { determineContentStatus, formatDateRelative, calculateDaysRemaining } from '@/utils/dateUtils';
import ContentExpiryInfo from './ContentExpiryInfo';
import useContentBrainHub from '@/hooks/useContentBrainHub';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Image, Video } from 'lucide-react';

export interface ContentCardProps {
  content: {
    id: string;
    title: string;
    type: string;
    createdAt: Date;
    daysRemaining?: number;
    status?: string;
    url?: string;
    content?: string;
  };
  onRenew?: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content,
  onRenew
}) => {
  const { getIntelligentRenewalCost } = useContentBrainHub();
  
  // Get the appropriate icon for the content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'text':
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'expiring':
        return 'bg-amber-500/10 text-amber-500';
      case 'expired':
        return 'bg-red-500/10 text-red-500';
      case 'draft':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Renewal cost calculation with brain hub
  const renewalCost = getIntelligentRenewalCost(content.status || 'active', content.type || 'text');
  
  // Calculate expiry date (6 months from creation)
  const expiryDate = new Date(content.createdAt);
  expiryDate.setMonth(expiryDate.getMonth() + 6);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-3 px-4 flex flex-row justify-between items-center">
        <div className="flex flex-1 items-start">
          <div>
            <div className="font-semibold truncate">{content.title}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Created {formatDateRelative(content.createdAt)}
            </div>
          </div>
        </div>
        <Badge className={`ml-2 ${getStatusColor(content.status || 'active')}`}>
          {content.status || 'active'}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-4">
        {content.url && content.type !== 'text' && (
          <div className="aspect-video mb-2 bg-muted rounded-md overflow-hidden">
            <img src={content.url} alt={content.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        {content.type === 'text' && content.content && (
          <div className="text-sm line-clamp-3 text-muted-foreground">{content.content}</div>
        )}
        
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center mr-4">
            {getContentTypeIcon(content.type)}
            <span className="ml-1 capitalize">{content.type}</span>
          </div>
          
          {content.daysRemaining !== undefined && (
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>
                {content.daysRemaining > 0
                  ? `${content.daysRemaining} days left`
                  : 'Expired'}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-0">
        {content.status !== 'draft' && (
          <ContentExpiryInfo 
            createdAt={content.createdAt}
            expiresAt={expiryDate}
            onRenew={() => onRenew && onRenew(content.id)}
            ubxCost={renewalCost}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
