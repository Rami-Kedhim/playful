
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Don't render breadcrumbs on homepage
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <React.Fragment key={name}>
            <ChevronRight className="mx-1 h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">
                {name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ')}
              </span>
            ) : (
              <Link 
                to={routeTo}
                className="hover:text-foreground transition-colors"
              >
                {name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ')}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
