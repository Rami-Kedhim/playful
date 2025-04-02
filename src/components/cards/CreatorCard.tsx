
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import CreatorCardImage from "./creator/CreatorCardImage";
import CreatorCardContent from "./creator/CreatorCardContent";

interface CreatorCardProps {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  isLive: boolean;
  isPremium: boolean;
  subscriberCount: number;
  contentCount: {
    photos: number;
    videos: number;
  };
  price: number;
  isAI: boolean;
  rating?: number;
}

const CreatorCard = ({
  id,
  name,
  username,
  imageUrl,
  isLive,
  isPremium,
  subscriberCount,
  contentCount,
  price,
  isAI,
  rating = 0,
}: CreatorCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link to={`/creators/${username}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full bg-card border-border">
        <CreatorCardImage
          imageUrl={imageUrl}
          name={name}
          isPremium={isPremium}
          isLive={isLive}
          isAI={isAI}
          isFavorited={isFavorited}
          subscriberCount={subscriberCount}
          price={price}
          toggleFavorite={toggleFavorite}
        />
        
        <CreatorCardContent
          name={name}
          username={username}
          contentCount={contentCount}
          isPremium={isPremium}
          rating={rating}
        />
      </Card>
    </Link>
  );
};

export default CreatorCard;
