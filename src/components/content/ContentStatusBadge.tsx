
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, Archive, Eye, FilePen, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ContentStatus = 'active' | 'expiring' | 'expired' | 'archived' | 'pending' | 'draft' | 'published';

interface ContentStatusBadgeProps {
  status: ContentStatus;
  daysRemaining?: number;
  className?: string;
  showIcon?: boolean;
}

const ContentStatusBadge: React.FC<ContentStatusBadgeProps> = ({ 
  status, 
  daysRemaining, 
  className,
  showIcon = true
}) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          icon: showIcon ? <CheckCircle className="h-3 w-3 mr-1" /> : null,
          variant: 'outline' as const,
        };
      case 'expiring':
        return {
          label: `Expiring${daysRemaining ? ` in ${daysRemaining} days` : ''}`,
          icon: showIcon ? <Clock className="h-3 w-3 mr-1" /> : null,
          variant: 'default' as const,
        };
      case 'expired':
        return {
          label: 'Expired',
          icon: showIcon ? <AlertTriangle className="h-3 w-3 mr-1" /> : null,
          variant: 'destructive' as const,
        };
      case 'archived':
        return {
          label: 'Archived',
          icon: showIcon ? <Archive className="h-3 w-3 mr-1" /> : null,
          variant: 'secondary' as const,
        };
      case 'pending':
        return {
          label: 'Pending Review',
          icon: showIcon ? <Eye className="h-3 w-3 mr-1" /> : null,
          variant: 'default' as const,
        };
      case 'draft':
        return {
          label: 'Draft',
          icon: showIcon ? <Edit className="h-3 w-3 mr-1" /> : null,
          variant: 'secondary' as const,
        };
      case 'published':
        return {
          label: 'Published',
          icon: showIcon ? <CheckCircle className="h-3 w-3 mr-1" /> : null,
          variant: 'success' as const,
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
    status === 'expired' && "bg-red-600 text-white hover:bg-red-700",
    status === 'published' && "bg-green-500 text-white hover:bg-green-600",
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
