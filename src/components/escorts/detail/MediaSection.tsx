
import React from 'react';
import { Tab } from '@headlessui/react';
import { Escort } from '@/types/escort';
import EscortGallery from './tabs/EscortGallery';

interface MediaSectionProps {
  escort: Escort;
}

const MediaSection: React.FC<MediaSectionProps> = ({ escort }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
      <EscortGallery 
        images={escort.gallery || []} 
        videos={escort.videos || []} 
      />
    </div>
  );
};

export default MediaSection;
