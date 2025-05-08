import React from 'react';
import { Escort } from '@/types/Escort';  // Using consistent casing
import { VerificationLevel } from '@/types/verification';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Verified } from 'lucide-react';

interface EscortProfileProps {
  escort: Escort;
  loading?: boolean;
}

const EscortProfile: React.FC<EscortProfileProps> = ({ escort, loading = false }) => {
  // Cast or convert the verificationLevel to the proper enum type
  const verificationLevel = escort.verificationLevel 
    ? (typeof escort.verificationLevel === 'string' 
      ? escort.verificationLevel as VerificationLevel 
      : escort.verificationLevel)
    : VerificationLevel.NONE;

  // Use the processed verification level for all component needs
  const normalizedEscort: Escort = {
    ...escort,
    verificationLevel: verificationLevel
  };

  if (loading) {
    return <div>Loading escort profile...</div>;
  }

  if (!escort) {
    return <div>Escort profile not found.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/3">
        <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-primary">
          <AvatarImage src={normalizedEscort.profileImage || normalizedEscort.imageUrl} alt={normalizedEscort.name} />
          <AvatarFallback>{normalizedEscort.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="mt-2 text-center">
          <h2 className="text-xl font-semibold">{normalizedEscort.name}</h2>
          <p className="text-muted-foreground">{normalizedEscort.location}</p>
          {normalizedEscort.isVerified && (
            <Badge variant="outline" className="mt-2">
              <Verified className="w-4 h-4 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </div>

      <div className="md:w-2/3">
        <h3 className="text-lg font-semibold">About</h3>
        <p className="text-muted-foreground">{normalizedEscort.bio || 'No bio available.'}</p>
        <h3 className="text-lg font-semibold mt-4">Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <span className="font-semibold">Age:</span> {normalizedEscort.age}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {normalizedEscort.gender}
          </div>
          <div>
            <span className="font-semibold">Price:</span> ${normalizedEscort.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortProfile;
