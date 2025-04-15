
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface VerificationCardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const VerificationCardWrapper: React.FC<VerificationCardWrapperProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default VerificationCardWrapper;
