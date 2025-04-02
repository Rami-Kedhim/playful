
import { useState, useCallback } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
}

export const GalleryImage = ({ src, alt }: GalleryImageProps) => {
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Double click/tap to zoom in/out
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (scale === 1) {
      // Zoom in to 2.5x centered on click position
      setScale(2.5);
    } else {
      // Reset zoom and position
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  // Start panning (for mouse)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setPanning(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [scale, position]);

  // Panning movement (for mouse)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (panning && scale > 1) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  }, [panning, scale, startPos]);

  // End panning (for mouse)
  const handleMouseUp = useCallback(() => {
    setPanning(false);
  }, []);

  // Touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scale > 1 && e.touches.length === 1) {
      setPanning(true);
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  }, [scale, position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (panning && scale > 1 && e.touches.length === 1) {
      e.preventDefault(); // Prevent screen scrolling
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y
      });
    }
  }, [panning, scale, startPos]);

  const handleTouchEnd = useCallback(() => {
    setPanning(false);
  }, []);

  // Reset zoom on image change
  const handleImageLoad = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain transition-transform cursor-zoom-in"
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          cursor: scale > 1 ? (panning ? 'grabbing' : 'grab') : 'zoom-in'
        }}
        onLoad={handleImageLoad}
        draggable="false"
      />
      {scale > 1 && (
        <button 
          className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10"
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
        >
          Reset Zoom
        </button>
      )}
    </div>
  );
};
