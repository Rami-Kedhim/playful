
import React from 'react';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import { Container } from '@/components/ui/container';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  withReveal?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * PageLayout component provides consistent layout for all pages in the UberEscorts ecosystem.
 * It follows the design principles outlined in the architecture master plan.
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  withReveal = true,
  fullWidth = false,
  className = '',
}) => {
  const content = (
    <div className={`min-h-screen bg-background ${className}`}>
      {(title || subtitle) && (
        <div className="py-8 md:py-12 border-b border-border/20">
          <Container>
            {title && <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>}
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </Container>
        </div>
      )}

      {fullWidth ? children : <Container className="py-8 md:py-12">{children}</Container>}
    </div>
  );

  // If withReveal is true, wrap the content in ScrollRevealGroup
  return withReveal ? (
    <ScrollRevealGroup
      animation="fade-up"
      staggerDelay={0.1}
      containerClassName="min-h-screen"
    >
      {content}
    </ScrollRevealGroup>
  ) : (
    content
  );
};

export default PageLayout;
