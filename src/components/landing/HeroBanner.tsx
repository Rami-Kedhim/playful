
import React from 'react';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  cta: React.ReactNode;
  imageUrl?: string;
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  cta,
  imageUrl,
  className
}) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-background py-16 md:py-24",
      className
    )}>
      {imageUrl && (
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={imageUrl} alt="Background" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{subtitle}</p>
          <div className="mt-8">{cta}</div>
        </div>
      </div>
    </div>
  );
};
