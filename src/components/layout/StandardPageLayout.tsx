
import React, { ReactNode } from "react";
import MainLayout from "./MainLayout";
import { cn } from "@/lib/utils";

interface StandardPageLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  fullWidth?: boolean;
  className?: string;
  headerAction?: ReactNode;
  headerContent?: ReactNode;
  sidebar?: ReactNode;
  sidebarPosition?: 'left' | 'right';
  containerClass?: string;
}

/**
 * StandardPageLayout provides a consistent layout structure for pages
 * with optional sidebar, header actions, and customizable content area
 */
const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  children,
  title,
  showHeader = true,
  fullWidth = false,
  className,
  headerAction,
  headerContent,
  sidebar,
  sidebarPosition = 'right',
  containerClass
}) => {
  return (
    <MainLayout 
      title={showHeader ? title : undefined} 
      showHeader={showHeader}
      containerClass={containerClass}
    >
      {/* Title and header content area */}
      {(title || headerContent) && (
        <div className={cn(
          "mb-6 flex items-start justify-between",
          headerAction ? "flex-row" : "flex-col"
        )}>
          <div className="space-y-1">
            {title && showHeader && (
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            )}
            {headerContent}
          </div>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      
      {/* Main content with optional sidebar */}
      <div className={cn(
        "flex flex-col gap-6",
        sidebar && "lg:flex-row",
        fullWidth ? "w-full" : "max-w-full",
        className
      )}>
        {/* Left sidebar placement */}
        {sidebar && sidebarPosition === 'left' && (
          <aside className="w-full lg:w-64 flex-shrink-0">
            {sidebar}
          </aside>
        )}
        
        {/* Main content area */}
        <main className={cn(
          "flex-1",
          sidebar ? "lg:max-w-[calc(100%-16rem)]" : "w-full"
        )}>
          {children}
        </main>
        
        {/* Right sidebar placement */}
        {sidebar && sidebarPosition === 'right' && (
          <aside className="w-full lg:w-64 flex-shrink-0">
            {sidebar}
          </aside>
        )}
      </div>
    </MainLayout>
  );
};

export default StandardPageLayout;
