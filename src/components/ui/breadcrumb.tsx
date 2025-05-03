
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ className }) => {
  // This component will actually get the crumbs from the parent component
  // It just provides the styling
  return (
    <nav className={cn("flex text-sm text-muted-foreground", className)}>
      {/* Content will be provided by the parent */}
    </nav>
  );
};

interface BreadcrumbItemProps {
  href: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ 
  href, 
  isLast = false,
  children 
}) => {
  return (
    <div className="flex items-center">
      {isLast ? (
        <span className="text-foreground font-medium">{children}</span>
      ) : (
        <Link to={href} className="hover:text-foreground transition-colors">
          {children}
        </Link>
      )}
      {!isLast && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
    </div>
  );
};
