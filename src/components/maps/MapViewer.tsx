
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, MapTypeControl } from '@react-google-maps/api';
import { Button } from "@/components/ui/button";

export interface MapViewerProps {
  apiKey: string;
  latitude: number;
  longitude: number;
  markerLabel?: string;
}

const MapViewer: React.FC<MapViewerProps> = ({ apiKey, latitude, longitude, markerLabel = 'Location' }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('normal');

  const mapStyles = {
    height: '400px',
    width: '100%'
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      map.setMapTypeId(selectedOption as google.maps.MapTypeId);
    }
  }, [selectedOption, map]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId={selectedOption as google.maps.MapTypeId}
      >
        <Marker position={center} label={markerLabel} />
        <MapTypeControl
          position={google.maps.ControlPosition.TOP_RIGHT}
          mapTypeIds={['normal', 'satellite', 'terrain', 'hybrid']}
          style={{ margin: '10px' }}
        />
      </GoogleMap>
      <div className="mt-2 flex space-x-2">
        <Button
          size="sm"
          variant="ubx"
          onClick={() => setSelectedOption('normal')}
        >Normal Map</Button>

        <Button
          size="sm"
          variant="ubx"
          onClick={() => setSelectedOption('satellite')}
        >Satellite</Button>

        <Button
          size="sm"
          variant="ubx"
          onClick={() => setSelectedOption('terrain')}
        >Terrain</Button>

        <Button
          size="sm"
          variant="ubx"
          onClick={() => setSelectedOption('hybrid')}
        >Hybrid</Button>
      </div>
    </LoadScript>
  );
};

export default MapViewer;
