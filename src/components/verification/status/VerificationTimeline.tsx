
import React from 'react';
import { VerificationRequest } from '@/types/escort';
import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isVerificationInProgress } from '@/utils/verification/assessmentProgress';

interface VerificationTimelineProps {
  verificationRequest: VerificationRequest;
}

const VerificationTimeline = ({ verificationRequest }: VerificationTimelineProps) => {
  const { status, submittedAt, updatedAt } = verificationRequest;
  
  const timelineSteps = [
    {
      id: 'submitted',
      label: 'Submitted',
      date: new Date(submittedAt).toLocaleDateString(),
      status: 'complete',
      icon: CheckCircle,
      iconClass: 'text-green-500'
    },
    {
      id: 'in_queue',
      label: 'In Queue',
      status: status === 'pending' ? 'current' : (status === 'in_review' || status === 'approved' || status === 'rejected') ? 'complete' : 'upcoming',
      icon: status === 'pending' ? Clock : CheckCircle,
      iconClass: status === 'pending' ? 'text-amber-500 animate-pulse' : 'text-green-500'
    },
    {
      id: 'in_review',
      label: 'Under Review',
      status: status === 'in_review' ? 'current' : (status === 'approved' || status === 'rejected') ? 'complete' : 'upcoming',
      icon: status === 'in_review' ? Clock : (status === 'approved' || status === 'rejected') ? CheckCircle : Clock,
      iconClass: status === 'in_review' ? 'text-blue-500 animate-pulse' : (status === 'approved' || status === 'rejected') ? 'text-green-500' : 'text-gray-400'
    },
    {
      id: 'decision',
      label: status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Decision',
      status: (status === 'approved' || status === 'rejected') ? 'complete' : 'upcoming',
      icon: status === 'approved' ? CheckCircle : status === 'rejected' ? XCircle : Clock, 
      iconClass: status === 'approved' ? 'text-green-500' : status === 'rejected' ? 'text-red-500' : 'text-gray-400'
    }
  ];

  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium mb-3">Verification Progress</h4>
      <ol className="relative border-l border-muted">
        {timelineSteps.map((step, index) => (
          <li key={step.id} className="mb-3 ml-4">
            <div className="absolute w-3 h-3 rounded-full -left-1.5 border border-background mt-1.5">
              <step.icon 
                className={cn(
                  "h-3 w-3", 
                  step.iconClass
                )} 
              />
            </div>
            <div>
              <h3 className="text-sm font-medium flex items-center">
                {step.label}
                {step.status === 'current' && (
                  <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">
                    Current
                  </span>
                )}
              </h3>
              {(step.id === 'submitted' || (step.id === 'decision' && (status === 'approved' || status === 'rejected'))) && (
                <time className="text-xs text-muted-foreground">
                  {step.id === 'submitted' ? 
                    new Date(submittedAt).toLocaleString() : 
                    updatedAt ? new Date(updatedAt).toLocaleString() : ''}
                </time>
              )}
            </div>
          </li>
        ))}
      </ol>
      
      {isVerificationInProgress(status) && (
        <div className="text-xs text-muted-foreground italic mt-2">
          Estimated completion within 24-48 hours of submission
        </div>
      )}
    </div>
  );
};

export default VerificationTimeline;
