
import { Escort } from "@/data/escortData";
import EscortGallery from "./EscortGallery";
import EscortVideoGallery from "./EscortVideoGallery";

interface MediaSectionProps {
  escort: Escort;
}

const MediaSection = ({ escort }: MediaSectionProps) => {
  return (
    <div>
      <EscortGallery escort={escort} />
      
      {/* Add Video Gallery below the image gallery */}
      {escort.videos && escort.videos.length > 0 && (
        <EscortVideoGallery videos={escort.videos} />
      )}
    </div>
  );
};

export default MediaSection;
