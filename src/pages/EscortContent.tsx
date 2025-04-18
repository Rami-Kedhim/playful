
import React from 'react';
import { Escort } from '@/types/Escort';

interface EscortContentProps {
  escort: Escort;
}

const EscortContent: React.FC<EscortContentProps> = ({ escort }) => {
  // Add a mock subscription price for the escort
  const subscriptionPrice = 19.99;
  
  // Add mock content stats if they don't exist
  const contentStats = {
    photos: 25,
    videos: 8,
    stories: 12
  };

  return (
    <div>
      <h2>Content from {escort.name}</h2>
      
      <div className="subscription-info">
        <h3>Subscription Details</h3>
        <p>Price: ${subscriptionPrice}/month</p>
        <button>Subscribe Now</button>
      </div>
      
      <div className="content-stats">
        <h3>Content Stats</h3>
        <ul>
          <li>{contentStats.photos} Photos</li>
          <li>{contentStats.videos} Videos</li>
          <li>{contentStats.stories} Stories</li>
        </ul>
      </div>
    </div>
  );
};

export default EscortContent;
