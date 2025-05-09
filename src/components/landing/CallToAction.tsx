
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  heading: string;
  message: string;
  buttonLabel: string;
  buttonLink: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  heading,
  message,
  buttonLabel,
  buttonLink
}) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{heading}</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{message}</p>
      <Link to={buttonLink}>
        <Button size="lg">{buttonLabel}</Button>
      </Link>
    </div>
  );
};
