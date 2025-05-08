
import React from 'react';
import { Escort } from '@/types/escort';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Star, CheckCircle, Language } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import ServiceTypeBadge from '@/components/escorts/filters/ServiceTypeBadge';
import ImageGallery from './ImageGallery';
import { VerificationLevel } from '@/types/verification';

interface ProfileInfoProps {
  escort: Escort;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ escort }) => {
  // Use shared verification level type
  const verificationLevel: VerificationLevel = escort.verificationLevel || 'none';

  const verificationColors = {
    'none': 'bg-gray-200 text-gray-700',
    'basic': 'bg-blue-100 text-blue-700',
    'verified': 'bg-green-100 text-green-700',
    'premium': 'bg-purple-100 text-purple-700',
  };
  
  const verificationLabels = {
    'none': 'Not Verified',
    'basic': 'Basic Verified',
    'verified': 'Verified',
    'premium': 'Premium Verified',
  };

  return (
    <div className="space-y-6">
      {/* Gallery */}
      <ImageGallery 
        images={escort.images || [escort.imageUrl || '']} 
        name={escort.name}
      />
      
      {/* Basic Info */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{escort.name}</h1>
        
        {escort.age && (
          <div className="flex items-center text-muted-foreground">
            <User className="inline-block mr-1 h-4 w-4" />
            <span>{escort.age} years</span>
          </div>
        )}
        
        {escort.location && (
          <div className="flex items-center text-muted-foreground">
            <MapPin className="inline-block mr-1 h-4 w-4" />
            <span>{escort.location}</span>
          </div>
        )}
        
        {Boolean(escort.rating) && (
          <div className="flex items-center">
            <Star className="inline-block mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="mr-1">{escort.rating?.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({escort.reviewCount || 0} reviews)
            </span>
          </div>
        )}
      </div>
      
      {/* Verification Badge */}
      <div className="flex items-center gap-2">
        <Badge className={verificationColors[verificationLevel]}>
          <CheckCircle className="mr-1 h-3 w-3" />
          {verificationLabels[verificationLevel]}
        </Badge>
        
        {escort.price && (
          <Badge variant="outline" className="font-medium">
            {formatCurrency(escort.price)}/hr
          </Badge>
        )}
      </div>
      
      {/* Service Types */}
      {escort.services && escort.services.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Services</h3>
          <div className="flex flex-wrap gap-2">
            {escort.services.map((service, i) => (
              <ServiceTypeBadge key={i} service={service as any} />
            ))}
          </div>
        </div>
      )}
      
      {/* Languages */}
      {escort.languages && escort.languages.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center">
            <Language className="mr-1 h-4 w-4" />
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {escort.languages.map((lang, i) => (
              <Badge key={i} variant="outline">{lang}</Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Bio */}
      {escort.bio && (
        <div className="space-y-2">
          <h3 className="font-medium">About Me</h3>
          <p className="text-muted-foreground whitespace-pre-line">{escort.bio}</p>
        </div>
      )}
      
      {/* Tags */}
      {escort.tags && escort.tags.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {escort.tags.map((tag, i) => (
              <Badge key={i} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
