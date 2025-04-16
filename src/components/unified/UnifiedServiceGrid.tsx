import React from 'react';
import { Grid } from "@/components/ui/grid";
import { SectionTitle } from "@/components/ui/typography";
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
          <SectionTitle title={title} description={description} />
        </div>
      )}
      
      <Grid className="gap-6">
        {services.map((service) => (
          <UnifiedServiceCard key={service.id} service={service} />
        ))}
      </Grid>
    </section>
  );
};

export default UnifiedServiceGrid;
