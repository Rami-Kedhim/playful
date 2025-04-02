
import { ReactNode } from "react";
import MainLayout from "./MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
  headerAction?: ReactNode;
}

/**
 * PageLayout extends MainLayout to provide a consistent card-based layout
 * for content pages with headers and descriptions
 */
const PageLayout = ({ 
  children, 
  title, 
  description,
  showHeader = true, 
  containerClass,
  fullWidth = false,
  headerAction
}: PageLayoutProps) => {
  return (
    <MainLayout 
      title={showHeader ? undefined : title} 
      showHeader={showHeader}
      containerClass={containerClass}
    >
      <Card className={fullWidth ? "w-full" : "max-w-4xl mx-auto"}>
        {(title || description) && (
          <CardHeader className={headerAction ? "flex-row items-center justify-between" : ""}>
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {headerAction}
          </CardHeader>
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default PageLayout;
