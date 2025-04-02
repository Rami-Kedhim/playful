
interface GalleryImageProps {
  src: string;
  alt: string;
}

export const GalleryImage = ({ src, alt }: GalleryImageProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
};
