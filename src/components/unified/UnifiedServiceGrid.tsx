
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, VideoIcon, Radio } from "lucide-react";
import UnifiedServiceCard from './UnifiedServiceCard';

interface UnifiedServiceGridProps {
  services: any[];
  title?: string;
  description?: string;
}

// Update the component to handle the "live" property safely
const UnifiedServiceGrid = ({ services, title, description, ...props }) => {
  const hasMedia = services.some(service => service.mediaGallery && Object.keys(service.mediaGallery).length > 0);
  
  const getTotalMediaCount = (mediaGallery) => {
    if (!mediaGallery) return 0;
    const { photos = 0, videos = 0, live = 0 } = mediaGallery;
    return photos + videos + (live || 0);
  };
  
  return (
    <section className="py-12">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <UnifiedServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default UnifiedServiceGrid;
