
import React from 'react';
import { CheckCircle, Clock, AlertCircle, Circle, XCircle } from 'lucide-react';
import { VerificationRequest, VerificationStatus } from '@/types/verification';

interface VerificationTimelineProps {
  verificationRequest: VerificationRequest;
}

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ verificationRequest }) => {
  const steps = [
    { 
      id: 'submitted', 
      label: 'Submitted', 
      date: verificationRequest.submittedAt || verificationRequest.createdAt || verificationRequest.created_at, 
      status: 'complete' as const
    },
    { 
      id: 'review',
      label: 'In Review',
      date: verificationRequest.status === 'in_review' ? verificationRequest.updatedAt || verificationRequest.updated_at : null,
      status: getStepStatus('in_review', verificationRequest.status)
    },
    { 
      id: 'approved',
      label: 'Approved',
      date: verificationRequest.status === 'approved' ? verificationRequest.updatedAt || verificationRequest.updated_at || verificationRequest.reviewerId || verificationRequest.reviewer_id : null,
      status: getStepStatus('approved', verificationRequest.status)
    },
    { 
      id: 'rejected',
      label: 'Rejected',
      date: verificationRequest.status === 'rejected' ? verificationRequest.updatedAt || verificationRequest.updated_at || verificationRequest.reviewerId || verificationRequest.reviewer_id : null,
      status: getStepStatus('rejected', verificationRequest.status)
    }
  ];

  function getStepStatus(step: string, currentStatus: string): 'pending' | 'current' | 'complete' | 'error' {
    if (currentStatus === 'rejected' && step === 'rejected') return 'error';
    if (currentStatus === 'approved' && step === 'approved') return 'complete';
    
    switch(step) {
      case 'in_review':
        if (currentStatus === 'in_review') return 'current';
        if (['approved', 'rejected'].includes(currentStatus)) return 'complete';
        return 'pending';
      case 'approved':
        if (currentStatus === 'approved') return 'complete';
        return 'pending';
      case 'rejected':
        if (currentStatus === 'rejected') return 'error';
        return 'pending';
      default:
        return 'pending';
    }
  }

  function getStepIcon(status: 'pending' | 'current' | 'complete' | 'error') {
    switch(status) {
      case 'complete': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current': return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
      case 'error': return <XCircle className="h-6 w-6 text-red-500" />;
      case 'pending': return <Circle className="h-6 w-6 text-gray-300" />;
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-2">Progress Timeline</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="mr-3 mt-0.5">
              {getStepIcon(step.status)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className={`font-medium ${
                  step.status === 'current' ? 'text-blue-600' : 
                  step.status === 'error' ? 'text-red-600' : 
                  step.status === 'complete' ? 'text-green-600' : 
                  'text-gray-600'
                }`}>{step.label}</h4>
                {step.date && (
                  <span className="text-xs text-gray-500">
                    {new Date(step.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && step.status !== 'pending' && (
                <div className="ml-3 mt-1 mb-1 w-0.5 h-6 bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationTimeline;
