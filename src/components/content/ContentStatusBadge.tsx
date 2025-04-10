
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, Archive, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ContentStatus = 'active' | 'expiring' | 'expired' | 'archived' | 'pending';

interface ContentStatusBadgeProps {
  status: ContentStatus;
  daysRemaining?: number;
  className?: string;
}

const ContentStatusBadge: React.FC<ContentStatusBadgeProps> = ({ 
  status, 
  daysRemaining, 
  className 
}) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          icon: <CheckCircle className="h-3 w-3 mr-1" />,
          variant: 'outline' as const,
        };
      case 'expiring':
        return {
          label: `Expiring in ${daysRemaining || '...'} days`,
          icon: <Clock className="h-3 w-3 mr-1" />,
          variant: 'warning' as const,
        };
      case 'expired':
        return {
          label: 'Expired',
          icon: <AlertTriangle className="h-3 w-3 mr-1" />,
          variant: 'destructive' as const,
        };
      case 'archived':
        return {
          label: 'Archived',
          icon: <Archive className="h-3 w-3 mr-1" />,
          variant: 'secondary' as const,
        };
      case 'pending':
        return {
          label: 'Pending Review',
          icon: <Eye className="h-3 w-3 mr-1" />,
          variant: 'default' as const,
        };
      default:
        return {
          label: 'Unknown',
          icon: null,
          variant: 'outline' as const,
        };
    }
  };

  const { label, icon, variant } = getStatusDetails();

  return (
    <Badge variant={variant} className={cn("flex items-center", className)}>
      {icon}
      <span>{label}</span>
    </Badge>
  );
};

export default ContentStatusBadge;
