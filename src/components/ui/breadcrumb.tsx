
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbsFromPath } from '@/utils/navigationHelpers';

export interface BreadcrumbProps {
  customLinks?: Array<{ label: string; path: string }>;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ customLinks }) => {
  const location = useLocation();
  const breadcrumbs = customLinks || getBreadcrumbsFromPath(location.pathname);
  
  if (breadcrumbs.length <= 1) return null; // Don't show for just home
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="inline-flex items-center">
            {index === 0 ? (
              <Link to={breadcrumb.path} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                <Home className="mr-1 h-4 w-4" />
                {breadcrumb.label}
              </Link>
            ) : (
              <div className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
                <Link
                  to={breadcrumb.path}
                  className={`ml-1 text-sm font-medium ${
                    index === breadcrumbs.length - 1
                      ? 'text-foreground cursor-default'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {breadcrumb.label}
                </Link>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
