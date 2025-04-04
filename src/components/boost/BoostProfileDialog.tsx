
import BoostDialogContainer from "./BoostDialogContainer";

interface BoostProfileDialogProps {
  profileId: string;
  onSuccess?: () => void;
}

const BoostProfileDialog = ({ profileId, onSuccess }: BoostProfileDialogProps) => {
  return (
    <BoostDialogContainer
      profileId={profileId}
      onSuccess={onSuccess}
      buttonText="Boost Profile"
      buttonVariant="outline"
      buttonSize="sm"
    />
  );
};

export default BoostProfileDialog;
