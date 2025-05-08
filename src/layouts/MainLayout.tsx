
import React, { ReactNode } from 'react';

export interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  showBreadcrumbs = false
}) => {
  return (
    <div className="container mx-auto p-4">
      {title && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      {showBreadcrumbs && (
        <div className="mb-4">
          {/* Breadcrumbs component would go here */}
        </div>
      )}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
