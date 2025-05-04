
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}>
      <Link to="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4 mr-1" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="h-4 w-4" />
            <Link 
              to={routeTo}
              className={cn(
                "hover:text-foreground transition-colors capitalize",
                isLast ? "text-foreground font-medium" : ""
              )}
              aria-current={isLast ? 'page' : undefined}
            >
              {name.replace(/-/g, ' ')}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
