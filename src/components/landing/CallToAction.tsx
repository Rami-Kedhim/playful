
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  heading: string;
  message: string;
  buttonLabel: string;
  buttonLink?: string;
  buttonAction?: () => void;
  secondaryButton?: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark' | 'gradient';
}

export const CallToAction: React.FC<CallToActionProps> = ({
  heading,
  message,
  buttonLabel,
  buttonLink = "/auth",
  buttonAction,
  secondaryButton,
  className,
  theme = 'gradient'
}) => {
  const bgClasses = {
    light: 'bg-card',
    dark: 'bg-primary text-primary-foreground',
    gradient: 'bg-gradient-to-br from-primary/20 to-primary/5'
  };

  const handleClick = () => {
    if (buttonAction) {
      buttonAction();
    }
  };

  const ButtonComponent = () => (
    <Button 
      size="lg" 
      onClick={handleClick}
      className="px-8"
    >
      {buttonLabel}
    </Button>
  );

  return (
    <div className={`${bgClasses[theme]} rounded-lg py-16 px-4 ${className}`}>
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-lg mb-8 text-muted-foreground">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttonLink ? (
            <Link to={buttonLink}>
              <ButtonComponent />
            </Link>
          ) : (
            <ButtonComponent />
          )}
          
          {secondaryButton && (
            <div>{secondaryButton}</div>
          )}
        </div>
      </div>
    </div>
  );
};
