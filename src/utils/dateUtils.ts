
import { format } from "date-fns";

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return `${diffInMinutes} min ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  if (diffInHours < 48) {
    return 'yesterday';
  }
  return format(date, 'MMM d');
};
