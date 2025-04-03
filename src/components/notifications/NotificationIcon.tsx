
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  Heart, 
  Award,
  AlertTriangle,
  Info,
  LucideIcon
} from "lucide-react";

interface NotificationIconProps {
  type: string;
  className?: string;
}

const NotificationIcon = ({ type, className = "h-4 w-4" }: NotificationIconProps) => {
  const getIcon = (): LucideIcon => {
    switch (type) {
      case "message":
        return MessageSquare;
      case "booking":
        return Calendar;
      case "payment":
        return DollarSign;
      case "like":
        return Heart;
      case "system":
        return Bell;
      case "achievement":
        return Award;
      case "warning":
        return AlertTriangle;
      default:
        return Info;
    }
  };
  
  const getColor = (): string => {
    switch (type) {
      case "message":
        return "text-blue-500";
      case "booking":
        return "text-green-500";
      case "payment":
        return "text-amber-500";
      case "like":
        return "text-pink-500";
      case "system":
        return "text-purple-500";
      case "achievement":
        return "text-yellow-500";
      case "warning":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  
  const IconComponent = getIcon();
  const colorClass = getColor();
  
  return <IconComponent className={`${className} ${colorClass}`} />;
};

export default NotificationIcon;
