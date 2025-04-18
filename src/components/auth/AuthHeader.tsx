
import React from 'react';
import { UserCheck, Lock } from 'lucide-react';

export interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title = 'Welcome',
  subtitle = 'Sign in to your account or create a new one',
  icon
}) => {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon || <Lock className="h-6 w-6 text-primary" />}
        </div>
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
