
import { BoostManagerContainer } from "./BoostManagerContainer";

export interface BoostManagerProps {
  profileId?: string;
  creatorId?: string;
  profileCompleteness?: number;
  isVerified?: boolean;
  rating?: number;
  profileCreatedDate?: Date;
  country?: string;
  role?: "verified" | "regular" | "AI";
  ubxBalance?: number;
}

const BoostManager = (props: BoostManagerProps) => {
  // Extract the profileId from the props
  const { profileId, creatorId } = props;
  
  // Pass profile ID to BoostManagerContainer (use creatorId as fallback)
  return <BoostManagerContainer profileId={profileId || creatorId} />;
};

export default BoostManager;
