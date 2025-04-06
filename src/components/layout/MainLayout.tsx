
import { ReactNode } from "react";
import AppLayout from "./AppLayout";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

/**
 * MainLayout provides a consistent layout structure for pages
 * by adding standard container and spacing within AppLayout
 */
const MainLayout = ({ 
  children, 
  title, 
  showHeader = true, 
  containerClass = "container mx-auto px-4 py-8",
  hideNavbar = false,
  hideFooter = false
}: MainLayoutProps) => {
  return (
    <AppLayout hideNavbar={hideNavbar} hideFooter={hideFooter}>
      <div className={containerClass}>
        {showHeader && title && (
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
        )}
        {children}
      </div>
    </AppLayout>
  );
};

export default MainLayout;
