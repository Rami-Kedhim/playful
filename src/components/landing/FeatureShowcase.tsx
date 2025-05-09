
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureShowcaseProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  features,
  title = "Our Features",
  subtitle = "Discover what makes UberEscorts unique"
}) => {
  return (
    <div className="container mx-auto px-4">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              {feature.icon && <div className="mb-4 text-primary">{feature.icon}</div>}
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
