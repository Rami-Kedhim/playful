
import React from "react";
import { cn } from "@/lib/utils";

interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
}

export const Gallery = ({
  children,
  columns = 2,
  gap = 4,
  className,
  ...props
}: GalleryProps) => {
  const gapClass = `gap-${gap}`;
  let colsClass = `grid-cols-1`;
  
  if (columns === 2) colsClass = "grid-cols-1 sm:grid-cols-2";
  if (columns === 3) colsClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  if (columns === 4) colsClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  
  return (
    <div 
      className={cn(`grid ${colsClass} ${gapClass}`, className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface ImageGalleryProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const ImageGallery = ({
  src,
  alt,
  className,
  ...props
}: ImageGalleryProps) => {
  return (
    <div className="overflow-hidden rounded-md">
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-auto w-full object-cover transition-all hover:scale-105",
          className
        )}
        {...props}
      />
    </div>
  );
};
