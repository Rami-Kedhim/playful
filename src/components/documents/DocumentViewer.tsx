
import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentViewerProps {
  url: string;
  type?: string;
  onClose?: () => void;
}

const DocumentViewer = ({ url, type = 'image', onClose }: DocumentViewerProps) => {
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = url.split('/').pop() || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCw className="h-4 w-4 mr-1" />
            Rotate
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        <TransformWrapper>
          {({ zoomIn, zoomOut }) => (
            <>
              <div className="absolute top-4 right-4 space-x-2 z-10">
                <Button variant="outline" size="sm" onClick={() => zoomIn()}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => zoomOut()}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
              
              <TransformComponent>
                <div 
                  style={{ 
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {type === 'pdf' ? (
                    <iframe 
                      src={url} 
                      className="w-full h-full"
                      title="PDF Document"
                    />
                  ) : (
                    <img 
                      src={url} 
                      alt="Document preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default DocumentViewer;
