import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { VerifiedMark } from '@/components/icons';
import { VerificationBadge } from '@/components/verification/VerificationBadge';

interface EscortCardProps {
  escort: {
    id: string;
    name: string;
    profileImage: string;
    location: string;
    price: number;
    isVerified: boolean;
  };
}

const EscortCard = ({ escort }) => {
  return (
    <div className="relative group">
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <Link to={`/escorts/profile/${escort.id}`}>
          <div className="relative">
            <img
              src={escort.profileImage}
              alt={escort.name}
              className="w-full h-48 object-cover rounded-t-md"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{escort.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">{escort.location}</span>
              <span className="font-medium">${escort.price}/hr</span>
            </div>
          </CardContent>
        </Link>
      </Card>
      
      {escort.isVerified && (
        <div className="absolute top-2 left-2 z-10">
          <VerificationBadge level="basic" size="sm" />
        </div>
      )}
    </div>
  );
};

export default EscortCard;
