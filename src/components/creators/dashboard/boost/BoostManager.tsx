
import { BoostManagerContainerProps } from "./types";
import BoostManagerContainer from "./BoostManagerContainer";

const BoostManager = (props: BoostManagerContainerProps) => {
  // Extract the profileId from the props
  const { profileId, creatorId } = props;
  
  // Pass profile ID to BoostManagerContainer (use creatorId as fallback)
  return <BoostManagerContainer profileId={profileId || creatorId} />;
};

export default BoostManager;
