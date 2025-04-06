
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Brain, ChevronRight, ChevronLeft, Sparkles, FileText, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface HermesSeoOnboardingProps {
  onComplete?: () => void;
}

const HermesSeoOnboarding: React.FC<HermesSeoOnboardingProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  
  const steps = [
    {
      title: "Welcome to HERMES SEO",
      description: "Let's get started optimizing your content with AI-powered tools",
      image: <Brain className="h-24 w-24 text-primary animate-pulse" />
    },
    {
      title: "Content Optimization",
      description: "Enhance visibility by optimizing titles, descriptions and keywords",
      image: <FileText className="h-24 w-24 text-primary/80" />
    },
    {
      title: "Real-time Recommendations",
      description: "Get instant feedback as you create content to maximize visibility",
      image: <Sparkles className="h-24 w-24 text-primary/80" />
    },
    {
      title: "Performance Analytics",
      description: "Track improvements and measure impact across all your content",
      image: <TrendingUp className="h-24 w-24 text-primary/80" />
    }
  ];
  
  useEffect(() => {
    // Check if onboarding has been shown before
    const hasSeenOnboarding = localStorage.getItem('hermes_onboarding_complete');
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    // Mark onboarding as complete
    localStorage.setItem('hermes_onboarding_complete', 'true');
    setIsOpen(false);
    
    toast({
      title: "Onboarding complete",
      description: "You're all set to start using HERMES SEO optimization!",
    });
    
    if (onComplete) {
      onComplete();
    }
  };
  
  const handleSkip = () => {
    // Mark onboarding as complete but allow showing again
    localStorage.setItem('hermes_onboarding_complete', 'true');
    setIsOpen(false);
    
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{steps[currentStep].title}</DialogTitle>
          <DialogDescription className="text-center">
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-6">
            {steps[currentStep].image}
          </div>
          
          <Progress value={(currentStep + 1) / steps.length * 100} className="w-[80%] h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <>
              <Button variant="ghost" onClick={handleSkip}>Skip</Button>
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </>
          ) : (
            <Button onClick={handleComplete} className="sm:ml-auto">
              <Check className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HermesSeoOnboarding;
