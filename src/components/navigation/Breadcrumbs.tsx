
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbsFromPath } from '@/utils/navigationHelpers';

interface BreadcrumbsProps {
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav aria-label="Breadcrumb" className={cn("flex text-sm", className)}>
      <ol className="flex items-center space-x-2 text-muted-foreground">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="flex items-center">
              {idx > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/70" />}
              {isLast ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link 
                  to={crumb.path}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
