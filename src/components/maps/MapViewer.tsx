
import React from 'react';
import LeafletMapViewer from './LeafletMapViewer';
import { apiConfig } from '@/config/apiConfig';

interface MapViewerProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
  }>;
  onMarkerClick?: (markerId: string) => void;
  height?: string;
  width?: string;
  apiKey?: string; 
  latitude?: number;
  longitude?: number;
  markerLabel?: string;
}

// This is a wrapper component that can easily switch between different map providers
const MapViewer: React.FC<MapViewerProps> = (props) => {
  return <LeafletMapViewer {...props} />;
};

export default MapViewer;
