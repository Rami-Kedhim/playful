
import React, { ReactNode } from "react";
import MainLayout from "./MainLayout";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface StandardPageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  fullWidth?: boolean;
  className?: string;
  headerAction?: ReactNode;
  headerContent?: ReactNode;
  sidebar?: ReactNode;
  sidebarPosition?: 'left' | 'right';
  containerClass?: string;
  footerContent?: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  dividers?: boolean;
}

/**
 * StandardPageLayout provides a consistent layout structure for pages
 * with optional sidebar, header actions, and customizable content area
 */
const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  children,
  title,
  description,
  showHeader = true,
  fullWidth = false,
  className,
  headerAction,
  headerContent,
  sidebar,
  sidebarPosition = 'right',
  containerClass,
  footerContent,
  hideNavbar = false,
  hideFooter = false,
  dividers = false
}) => {
  return (
    <MainLayout 
      title={showHeader ? title : undefined} 
      showHeader={showHeader}
      containerClass={containerClass}
      hideNavbar={hideNavbar}
      hideFooter={hideFooter}
    >
      {/* Title and header content area */}
      {(title || description || headerContent) && (
        <>
          <div className={cn(
            "mb-6 flex items-start",
            headerAction ? "justify-between" : "flex-col"
          )}>
            <div className="space-y-1">
              {title && showHeader && (
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              )}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
              {headerContent}
            </div>
            {headerAction && (
              <div>{headerAction}</div>
            )}
          </div>
          {dividers && <Separator className="mb-6" />}
        </>
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
      
      {/* Optional footer content */}
      {footerContent && (
        <>
          {dividers && <Separator className="my-6" />}
          <div className="mt-6">
            {footerContent}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default StandardPageLayout;
