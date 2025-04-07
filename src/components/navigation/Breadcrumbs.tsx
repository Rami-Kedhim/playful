
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbsFromPath } from '@/utils/navigation';

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);
  
  return (
    <div className={`flex items-center text-sm ${className}`}>
      {breadcrumbs.map((crumb, i) => {
        const isLast = i === breadcrumbs.length - 1;
        
        return (
          <React.Fragment key={crumb.path}>
            {i > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}
            
            {isLast ? (
              <span className="font-medium">{crumb.label}</span>
            ) : (
              <Link 
                to={crumb.path} 
                className="hover:text-primary transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
