
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
          label: `Expiring${daysRemaining ? ` in ${daysRemaining} days` : ''}`,
          icon: <Clock className="h-3 w-3 mr-1" />,
          variant: 'default' as const,
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
  
  // Add specific styling for expiring status
  const badgeClasses = cn(
    "flex items-center", 
    status === 'expiring' && "bg-amber-500 text-white hover:bg-amber-600",
    className
  );

  return (
    <Badge variant={variant} className={badgeClasses}>
      {icon}
      <span>{label}</span>
    </Badge>
  );
};

export default ContentStatusBadge;
