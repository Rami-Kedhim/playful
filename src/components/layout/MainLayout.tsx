
import { ReactNode } from "react";
import AppLayout from "./AppLayout";
import Breadcrumbs from "../navigation/Breadcrumbs";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  showBreadcrumbs?: boolean;
}

/**
 * MainLayout provides a consistent layout structure for pages
 * by adding standard container and spacing within AppLayout
 */
const MainLayout = ({ 
  children, 
  title, 
  description,
  showHeader = true, 
  containerClass = "container mx-auto px-4 py-8",
  hideNavbar = false,
  hideFooter = false,
  showBreadcrumbs = true
}: MainLayoutProps) => {
  return (
    <AppLayout hideNavbar={hideNavbar} hideFooter={hideFooter}>
      <div className={containerClass}>
        {showBreadcrumbs && (
          <div className="mb-4">
            <Breadcrumbs />
          </div>
        )}
        
        {showHeader && title && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-2">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </AppLayout>
  );
};

export default MainLayout;
