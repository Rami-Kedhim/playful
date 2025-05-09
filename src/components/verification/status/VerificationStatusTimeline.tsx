import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VerificationStatus, VERIFICATION_STATUS } from '@/types/verification';

interface TimelineStep {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'error';
}

interface VerificationStatusTimelineProps {
  status: string;
  className?: string;
}

export function VerificationStatusTimeline({ status, className }: VerificationStatusTimelineProps) {
  const steps: TimelineStep[] = [
    {
      title: 'Documents Submitted',
      description: 'Your verification documents have been uploaded',
      status: 'completed'
    },
    {
      title: 'Initial Review',
      description: 'Documents are being reviewed by our system',
      status: status === VERIFICATION_STATUS.PENDING ? 'current' : 
             status === VERIFICATION_STATUS.IN_REVIEW || status === VERIFICATION_STATUS.APPROVED || status === VERIFICATION_STATUS.REJECTED ? 'completed' : 
             'upcoming'
    },
    {
      title: 'Manual Verification',
      description: 'Documents are being verified by our team',
      status: status === VERIFICATION_STATUS.IN_REVIEW ? 'current' :
             status === VERIFICATION_STATUS.APPROVED || status === VERIFICATION_STATUS.REJECTED ? 'completed' :
             'upcoming'
    },
    {
      title: 'Final Decision',
      description: 'Verification process complete',
      status: status === VERIFICATION_STATUS.APPROVED ? 'completed' :
             status === VERIFICATION_STATUS.REJECTED ? 'error' :
             'upcoming'
    }
  ];

  return (
    <div className={cn("w-full space-y-4", className)}>
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-start">
          <div className="flex items-center justify-center">
            <div className={cn(
              "rounded-full w-8 h-8 flex items-center justify-center",
              step.status === 'completed' && "bg-primary/10",
              step.status === 'current' && "bg-blue-500/10",
              step.status === 'error' && "bg-destructive/10",
              step.status === 'upcoming' && "bg-muted"
            )}>
              {step.status === 'completed' && (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              )}
              {step.status === 'current' && (
                <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
              )}
              {step.status === 'error' && (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              {step.status === 'upcoming' && (
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              )}
            </div>
          </div>
          
          <div className="ml-4 flex-1">
            <h4 className={cn(
              "text-sm font-medium",
              step.status === 'current' && "text-blue-500",
              step.status === 'error' && "text-destructive",
              step.status === 'upcoming' && "text-muted-foreground"
            )}>
              {step.title}
            </h4>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VerificationStatusTimeline;
