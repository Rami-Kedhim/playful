
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader = ({ title }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
    </div>
  );
};

export default ProfileHeader;
