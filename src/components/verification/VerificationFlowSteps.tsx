
import React from 'react';
import { Circle, CircleDot, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VerificationStatus } from '@/types/verification';

interface VerificationFlowStepsProps {
  status: VerificationStatus;
  className?: string;
}

const VerificationFlowSteps = ({ status, className }: VerificationFlowStepsProps) => {
  const steps = [
    { id: 1, label: 'Submit Documents', completed: true },
    { id: 2, label: 'Under Review', completed: status !== VerificationStatus.PENDING },
    { id: 3, label: 'Verification Complete', completed: status === VerificationStatus.APPROVED || status === VerificationStatus.REJECTED }
  ];

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary mb-2">
                {step.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                ) : status === VerificationStatus.PENDING && step.id === 2 ? (
                  <CircleDot className="w-6 h-6 text-primary animate-pulse" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <span className="text-xs text-center text-muted-foreground">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-[2px] mx-4",
                  step.completed ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VerificationFlowSteps;
