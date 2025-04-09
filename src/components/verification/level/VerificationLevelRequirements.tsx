
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Circle, ArrowRight, Upload, Smartphone, Mail } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

interface VerificationLevelRequirementsProps {
  currentLevel: VerificationLevel;
  targetLevel: VerificationLevel;
  onComplete: () => void;
}

const VerificationLevelRequirements = ({
  currentLevel,
  targetLevel,
  onComplete
}: VerificationLevelRequirementsProps) => {
  // Mock requirements based on the target level
  const requirements = [
    {
      id: 'id_verification',
      title: 'ID Verification',
      description: 'Upload a government-issued ID',
      icon: <Upload className="h-5 w-5 text-primary" />,
      forLevels: ['basic', 'enhanced', 'premium'],
      alreadyCompleted: currentLevel !== 'none'
    },
    {
      id: 'phone_verification',
      title: 'Phone Verification',
      description: 'Verify your phone number',
      icon: <Smartphone className="h-5 w-5 text-primary" />,
      forLevels: ['enhanced', 'premium'],
      alreadyCompleted: currentLevel === 'enhanced' || currentLevel === 'premium'
    },
    {
      id: 'email_verification',
      title: 'Email Verification',
      description: 'Verify your email address',
      icon: <Mail className="h-5 w-5 text-primary" />,
      forLevels: ['enhanced', 'premium'],
      alreadyCompleted: currentLevel === 'enhanced' || currentLevel === 'premium'
    },
    {
      id: 'in_person_verification',
      title: 'In-Person Verification',
      description: 'Schedule an in-person verification meeting',
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      forLevels: ['premium'],
      alreadyCompleted: currentLevel === 'premium'
    }
  ];
  
  // Filter requirements based on the target level and what's already completed
  const applicableRequirements = requirements.filter(
    req => req.forLevels.includes(targetLevel) && !req.alreadyCompleted
  );
  
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const handleCompleteStep = (stepId: string) => {
    // In a real app, this would handle the actual verification process for each step
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };
  
  const progress = applicableRequirements.length > 0
    ? (completedSteps.length / applicableRequirements.length) * 100
    : 100;
  
  const allCompleted = applicableRequirements.length === completedSteps.length || applicableRequirements.length === 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Verification Requirements</h2>
        <p className="text-muted-foreground">
          Complete the following requirements to upgrade your verification level
        </p>
      </div>
      
      <Progress value={progress} className="h-2 mb-4" />
      
      {applicableRequirements.length > 0 ? (
        <div className="space-y-4">
          {applicableRequirements.map((req) => {
            const isCompleted = completedSteps.includes(req.id);
            
            return (
              <Card key={req.id} className={isCompleted ? "border-green-500/30 bg-green-500/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                        {req.icon}
                      </div>
                      
                      <div>
                        <div className="font-medium">{req.title}</div>
                        <div className="text-sm text-muted-foreground">{req.description}</div>
                      </div>
                    </div>
                    
                    <div>
                      {isCompleted ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle2 className="h-5 w-5 mr-1" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => handleCompleteStep(req.id)}>
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          <div className="pt-4">
            <Button 
              onClick={onComplete} 
              disabled={!allCompleted} 
              className="w-full"
            >
              Continue <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            {!allCompleted && (
              <p className="text-sm text-center text-muted-foreground mt-2">
                Complete all requirements to continue
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="py-4 text-center">
          <p className="text-lg font-medium mb-2">All requirements already completed!</p>
          <p className="text-muted-foreground mb-4">
            You've already completed all the required verification steps for {targetLevel} level.
          </p>
          <Button onClick={onComplete}>
            Continue to Next Step <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerificationLevelRequirements;
