
import React, { ReactNode } from 'react';
import MainLayout from './MainLayout';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProfileLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backLink?: string;
  actions?: ReactNode;
}

const ProfileLayout = ({ 
  children, 
  title, 
  subtitle, 
  backLink, 
  actions 
}: ProfileLayoutProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (backLink) {
      navigate(backLink);
    } else {
      navigate(-1);
    }
  };

  return (
    <MainLayout showHeader={false} containerClass="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack} 
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              {title && (
                <h1 className="text-3xl font-bold">{title}</h1>
              )}
              {subtitle && (
                <p className="text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
      
      {children}
    </MainLayout>
  );
};

export default ProfileLayout;
