
import { MapPin, Video, Users } from "lucide-react";

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
}

const ServiceTypeBadgeLabel = ({ type }: ServiceTypeBadgeLabelProps) => {
  switch (type) {
    case "in-person":
      return (
        <span className="inline-flex items-center gap-1 text-blue-500">
          <MapPin className="h-3 w-3" />
          <span>In-Person</span>
        </span>
      );
    case "virtual":
      return (
        <span className="inline-flex items-center gap-1 text-purple-500">
          <Video className="h-3 w-3" />
          <span>Virtual</span>
        </span>
      );
    case "both":
      return (
        <span className="inline-flex items-center gap-1 text-green-500">
          <Users className="h-3 w-3" />
          <span>Both Services</span>
        </span>
      );
    default:
      return null;
  }
};

export default ServiceTypeBadgeLabel;
