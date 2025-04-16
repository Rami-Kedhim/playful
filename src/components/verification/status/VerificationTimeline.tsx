
import React from 'react';
import { CheckCircle, Circle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VerificationRequest, VerificationStatus } from '@/types/auth';

interface TimelineStepProps {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'rejected';
  isLast?: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ title, description, status, isLast }) => {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current':
        return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
      case 'pending':
        return <Circle className="h-6 w-6 text-gray-300" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div>{getIcon()}</div>
        {!isLast && <div className="h-full w-px bg-gray-200 dark:bg-gray-700 my-1"></div>}
      </div>
      <div className={cn(
        "pb-6",
        status === 'completed' && "text-green-700 dark:text-green-400",
        status === 'current' && "text-blue-700 dark:text-blue-400",
        status === 'pending' && "text-gray-500",
        status === 'rejected' && "text-red-700 dark:text-red-400"
      )}>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

interface VerificationTimelineProps {
  verificationRequest: VerificationRequest;
}

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ verificationRequest }) => {
  const status = verificationRequest.status as VerificationStatus;
  
  const getStepStatus = (step: string): 'completed' | 'current' | 'pending' | 'rejected' => {
    if (status === 'rejected' && step === 'review') return 'rejected';
    
    switch (step) {
      case 'submission':
        return 'completed';
      case 'review':
        if (status === 'pending') return 'current';
        if (status === 'in_review') return 'current';
        if (status === 'approved' || status === 'rejected') return 'completed';
        return 'pending';
      case 'verification':
        if (status === 'approved') return 'completed';
        if (status === 'rejected') return 'rejected';
        return 'pending';
      default:
        return 'pending';
    }
  };

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium mb-3">Verification Progress</h3>
      <div className="space-y-0">
        <TimelineStep 
          title="Submission"
          description="Documents submitted for verification"
          status={getStepStatus('submission')}
        />
        <TimelineStep 
          title="Review"
          description="Team review of your documents"
          status={getStepStatus('review')}
        />
        <TimelineStep 
          title="Verification"
          description="Account verification status"
          status={getStepStatus('verification')}
          isLast
        />
      </div>
    </div>
  );
};

export default VerificationTimeline;
