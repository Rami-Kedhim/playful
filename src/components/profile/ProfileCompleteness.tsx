
import { Progress } from "@/components/ui/progress";

interface ProfileCompletenessProps {
  completeness: number;
}

const ProfileCompleteness = ({ completeness }: ProfileCompletenessProps) => {
  const getColorClass = (value: number) => {
    if (value < 30) return "text-destructive";
    if (value < 70) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Profile Completeness</h3>
        <span className={`text-sm font-medium ${getColorClass(completeness)}`}>
          {completeness}%
        </span>
      </div>
      <Progress value={completeness} className="h-2" />
      {completeness < 100 && (
        <p className="text-xs text-muted-foreground">
          Complete your profile to unlock all features
        </p>
      )}
    </div>
  );
};

export default ProfileCompleteness;
