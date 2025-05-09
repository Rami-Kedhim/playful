import React from 'react';
import { Clock, CheckCircle, AlertTriangle, FileCheck } from 'lucide-react';
import { VerificationRequest, VerificationStatus, VERIFICATION_STATUS } from '@/types/verification';

interface VerificationTimelineProps {
  verificationRequest: VerificationRequest;
}

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ 
  verificationRequest 
}) => {
  if (!verificationRequest) return null;

  const getTimelineSteps = () => {
    const steps = [
      {
        id: 'submitted',
        title: 'Documents Submitted',
        description: 'Your verification documents have been uploaded successfully.',
        icon: <FileCheck className="h-5 w-5 text-primary" />,
        date: new Date(verificationRequest.submittedAt || verificationRequest.created_at || Date.now()).toLocaleDateString(),
        completed: true
      },
      {
        id: 'pending',
        title: 'Pending Review',
        description: 'Your submission is in the queue awaiting review.',
        icon: <Clock className="h-5 w-5 text-amber-500" />,
        date: '',
        completed: [
          'pending',
          'in_review',
          'approved'
        ].includes(String(verificationRequest.status).toLowerCase())
      },
      {
        id: 'review',
        title: 'Under Review',
        description: 'Our team is currently reviewing your submission.',
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        date: '',
        completed: [
          'in_review',
          'approved'
        ].includes(String(verificationRequest.status).toLowerCase())
      },
      {
        id: 'decision',
        title: String(verificationRequest.status).toLowerCase() === 'approved' 
          ? 'Verification Approved' 
          : 'Verification Decision',
        description: String(verificationRequest.status).toLowerCase() === 'approved'
          ? 'Congratulations! Your verification has been approved.' 
          : 'Awaiting final decision on your verification.',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        date: '',
        completed: String(verificationRequest.status).toLowerCase() === 'approved'
      }
    ];

    return steps;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">Verification Progress</h3>
      <ol className="relative border-l border-muted">
        {getTimelineSteps().map((step, index) => (
          <li key={step.id} className={`ml-4 ${index === getTimelineSteps().length - 1 ? '' : 'mb-6'}`}>
            <div className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border ${
              step.completed ? 'border-primary bg-primary' : 'border-muted bg-muted'
            }`}></div>
            <div className="flex items-start">
              <div className={`mr-3 ${step.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                {step.icon}
              </div>
              <div>
                <h4 className={`font-medium ${step.completed ? '' : 'text-muted-foreground'}`}>{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {step.date && (
                  <time className="text-xs text-muted-foreground">{step.date}</time>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default VerificationTimeline;
