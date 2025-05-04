
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBreadcrumbsFromPath } from '@/utils/navigationHelpers';

interface BreadcrumbsProps {
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className={cn('flex items-center text-sm text-muted-foreground', className)}>
      <ol className="flex flex-wrap items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight size={14} className="mx-1 text-muted-foreground" />
              )}
              
              {isLast ? (
                <span className="font-medium text-foreground">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link 
                  to={breadcrumb.path} 
                  className="hover:text-foreground transition-colors"
                >
                  {breadcrumb.label}
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
