
import { ReactNode } from "react";
import AppLayout from "./AppLayout";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  containerClass?: string;
}

/**
 * MainLayout provides a consistent layout structure for pages
 * by wrapping the AppLayout component with standardized container and spacing
 */
const MainLayout = ({ 
  children, 
  title, 
  showHeader = true, 
  containerClass = "container mx-auto px-4 py-8" 
}: MainLayoutProps) => {
  return (
    <AppLayout>
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
