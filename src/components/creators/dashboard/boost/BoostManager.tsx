
import { BoostManagerContainerProps } from "./types";
import BoostManagerContainer from "./BoostManagerContainer";

interface CreatorInfoProps {
  creatorId: string;
  profileCompleteness: number;
  isVerified: boolean;
  rating: number;
  profileCreatedDate: Date;
  country: string;
  role: "verified" | "regular" | "AI";
  ubxBalance: number;
}

const BoostManager = (props: BoostManagerContainerProps) => {
  // Extract the profileId from the props
  const { profileId } = props;
  
  // Pass only the profileId to BoostManagerContainer
  return <BoostManagerContainer profileId={profileId} />;
};

export default BoostManager;
