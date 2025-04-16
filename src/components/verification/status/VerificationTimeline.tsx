
import React from 'react';
import { CheckCircle, CircleDashed, Clock, X } from 'lucide-react';
import { VerificationStatus } from '@/types/verification';
import { cn } from '@/lib/utils';

interface VerificationTimelineProps {
  status: VerificationStatus;
  updatedAt?: string;
}

// Circle component for the timeline
const Circle = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={cn("h-6 w-6 rounded-full flex items-center justify-center", className)}>
    {children}
  </div>
);

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ status, updatedAt }) => {
  const getStatusDate = () => {
    if (!updatedAt) return '';
    return new Date(updatedAt).toLocaleDateString();
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <Circle className="bg-green-100 text-green-600"><CheckCircle className="h-4 w-4" /></Circle>;
      case 'rejected':
        return <Circle className="bg-red-100 text-red-600"><X className="h-4 w-4" /></Circle>;
      case 'in_review':
        return <Circle className="bg-yellow-100 text-yellow-600"><Clock className="h-4 w-4" /></Circle>;
      case 'pending':
      default:
        return <Circle className="bg-gray-100 text-gray-500"><CircleDashed className="h-4 w-4" /></Circle>;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'approved':
        return 'Your verification has been approved.';
      case 'rejected':
        return 'Your verification has been rejected. Please check the reason and try again.';
      case 'in_review':
        return 'Your verification is being reviewed by our team.';
      case 'pending':
      default:
        return 'Your verification is pending review.';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'in_review':
        return 'text-yellow-600';
      case 'pending':
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div>
          <p className={cn("font-medium", getStatusColor())}>
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </p>
          <p className="text-sm text-muted-foreground">
            {getStatusDate()}
          </p>
        </div>
      </div>
      <p className="pl-9 text-sm">
        {getStatusText()}
      </p>
    </div>
  );
};

export default VerificationTimeline;
