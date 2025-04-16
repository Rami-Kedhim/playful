import React from 'react';
import { CheckCircle, AlertTriangle, Clock, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VerificationRequest } from '@/types/auth';

// Define any missing types
type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

interface TimelineStep {
  id: string;
  name: string;
  status: 'upcoming' | 'current' | 'complete';
  date: string;
}

interface VerificationTimelineProps {
  verificationRequest: VerificationRequest | null;
}

const VerificationTimeline = ({ verificationRequest }) => {
  const getStatusIcon = (status: string) => {
    const typedStatus = status as VerificationStatus;
    
    switch (typedStatus) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'in_review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
      default:
        return <Loader2 className="h-4 w-4 animate-spin text-gray-500" />;
    }
  };
  
  const getStatusColor = (status: string): string => {
    const typedStatus = status as VerificationStatus;
    
    switch (typedStatus) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'in_review':
        return 'text-yellow-500';
      case 'pending':
      default:
        return 'text-gray-500';
    }
  };

  const timelineSteps: TimelineStep[] = [
    {
      id: 'submitted',
      name: 'Submitted',
      status: 'complete',
      date: verificationRequest?.created_at || 'N/A',
    },
    {
      id: 'review',
      name: 'In Review',
      status: verificationRequest?.status === 'in_review' ? 'current' : 'upcoming',
      date: verificationRequest?.updated_at || 'N/A',
    },
    {
      id: 'approved',
      name: 'Approved',
      status: verificationRequest?.status === 'approved' ? 'complete' : 'upcoming',
      date: verificationRequest?.updated_at || 'N/A',
    },
  ];

  return (
    <div className="relative">
      {timelineSteps.map((step, index) => (
        <div key={step.id} className="mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white border-2">
                {getStatusIcon(verificationRequest?.status || 'pending')}
              </span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-semibold">{step.name}</h4>
              <p className="text-xs text-muted-foreground">
                {step.date}
              </p>
            </div>
          </div>
          {index < timelineSteps.length - 1 && (
            <div className="ml-3 mt-2 pl-2 border-l border-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerificationTimeline;
