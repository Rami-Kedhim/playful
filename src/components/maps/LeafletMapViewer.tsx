
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apiConfig } from '@/config/apiConfig';

interface LeafletMapViewerProps {
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
  latitude?: number;
  longitude?: number;
  markerLabel?: string;
}

const LeafletMapViewer: React.FC<LeafletMapViewerProps> = ({
  center,
  zoom = 14,
  markers = [],
  onMarkerClick,
  height = '400px',
  width = '100%',
  latitude,
  longitude,
  markerLabel
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  
  // If latitude and longitude are provided, use them to create a center object
  const mapCenter = latitude && longitude 
    ? { lat: latitude, lng: longitude } 
    : center || { lat: 0, lng: 0 }; // Provide fallback default

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Initialize map
    mapInstance.current = L.map(mapContainer.current).setView(
      [mapCenter.lat, mapCenter.lng], 
      zoom
    );

    // Add OpenStreetMap tile layer
    L.tileLayer(apiConfig.maps.url, {
      attribution: apiConfig.maps.attribution,
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Create marker from latitude, longitude if provided
    const allMarkers = [...markers];
    if (latitude && longitude && !markers.some(m => m.position.lat === latitude && m.position.lng === longitude)) {
      allMarkers.push({
        id: 'main-marker',
        position: { lat: latitude, lng: longitude },
        title: markerLabel || 'Location'
      });
    }

    // Add markers
    allMarkers.forEach(marker => {
      const mapMarker = L.marker([marker.position.lat, marker.position.lng], {
        title: marker.title
      }).addTo(mapInstance.current!);
      
      if (onMarkerClick) {
        mapMarker.on('click', () => onMarkerClick(marker.id));
      }
      
      markersRef.current.push(mapMarker);
    });

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markersRef.current = [];
      }
    };
  }, [mapCenter.lat, mapCenter.lng, zoom]); // Only recreate on core props change

  // Update markers when they change
  useEffect(() => {
    if (!mapInstance.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Create marker from latitude, longitude if provided
    const allMarkers = [...markers];
    if (latitude && longitude && !markers.some(m => m.position.lat === latitude && m.position.lng === longitude)) {
      allMarkers.push({
        id: 'main-marker',
        position: { lat: latitude, lng: longitude },
        title: markerLabel || 'Location'
      });
    }
    
    // Add updated markers
    allMarkers.forEach(marker => {
      const mapMarker = L.marker([marker.position.lat, marker.position.lng], {
        title: marker.title
      }).addTo(mapInstance.current!);
      
      if (onMarkerClick) {
        mapMarker.on('click', () => onMarkerClick(marker.id));
      }
      
      markersRef.current.push(mapMarker);
    });
  }, [markers, latitude, longitude, markerLabel, onMarkerClick]);

  return (
    <div style={{ width, height, position: 'relative' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default LeafletMapViewer;
