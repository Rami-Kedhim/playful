
import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type VerificationStep = 'submitted' | 'documents_verified' | 'identity_confirmed' | 'completed';
type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

interface VerificationTimelineProps {
  status: VerificationStatus;
  currentStep?: VerificationStep;
  rejectionReason?: string;
}

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({
  status,
  currentStep = 'submitted',
  rejectionReason
}) => {
  const steps: { id: VerificationStep; label: string }[] = [
    { id: 'submitted', label: 'Application Submitted' },
    { id: 'documents_verified', label: 'Documents Verified' },
    { id: 'identity_confirmed', label: 'Identity Confirmed' },
    { id: 'completed', label: 'Verification Completed' }
  ];

  // Map the status to a step index (0-3)
  const getCurrentStepIndex = () => {
    if (status === 'rejected') return -1;
    
    switch (currentStep) {
      case 'submitted': return 0;
      case 'documents_verified': return 1;
      case 'identity_confirmed': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="space-y-4">
      {status === 'rejected' && (
        <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md mb-4 flex items-start gap-3">
          <XCircle className="text-destructive h-5 w-5 mt-0.5" />
          <div>
            <h4 className="font-semibold text-destructive">Verification Rejected</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {rejectionReason || "Your verification was rejected. Please review the requirements and try again."}
            </p>
          </div>
        </div>
      )}
      
      <div className="relative">
        {steps.map((step, index) => {
          let Icon;
          let bgColor;
          
          if (status === 'rejected') {
            Icon = index === 0 ? XCircle : AlertCircle;
            bgColor = index === 0 ? 'bg-destructive' : 'bg-muted';
          } else if (index < currentStepIndex) {
            Icon = CheckCircle;
            bgColor = 'bg-green-500';
          } else if (index === currentStepIndex) {
            Icon = status === 'approved' ? CheckCircle : Clock;
            bgColor = status === 'approved' ? 'bg-green-500' : 'bg-blue-500';
          } else {
            Icon = Clock;
            bgColor = 'bg-muted';
          }
          
          return (
            <div key={step.id} className={cn(
              "flex items-start mb-6 last:mb-0", 
              index > currentStepIndex && status !== 'approved' && 'opacity-50'
            )}>
              <div className={cn("rounded-full p-1 mr-3", bgColor)}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">{step.label}</p>
                <p className="text-sm text-muted-foreground">
                  {index < currentStepIndex && "Completed"}
                  {index === currentStepIndex && status !== 'approved' && "In progress"}
                  {index === currentStepIndex && status === 'approved' && "Completed"}
                  {index > currentStepIndex && "Pending"}
                </p>
              </div>
              
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "absolute left-2.5 ml-px w-0.5 h-10", 
                    index < currentStepIndex ? 'bg-green-500' : 'bg-muted'
                  )}
                  style={{ top: `${(index * 6) + 2.5}rem` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationTimeline;
