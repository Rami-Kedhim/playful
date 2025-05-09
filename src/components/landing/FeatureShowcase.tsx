
import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureShowcaseProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  subtitle,
  features
}) => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            {feature.icon && (
              <div className="mb-4 bg-primary/10 p-3 inline-block rounded-full">
                {feature.icon}
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
