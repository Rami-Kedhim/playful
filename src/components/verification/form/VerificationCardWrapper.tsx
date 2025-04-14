
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface VerificationCardWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const VerificationCardWrapper = ({ children, title, description }: VerificationCardWrapperProps) => {
  return (
    <Card className="border-muted shadow-sm">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-xl">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default VerificationCardWrapper;
