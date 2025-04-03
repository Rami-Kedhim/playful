
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Heart, Flag, MoreHorizontal } from "lucide-react";
import { Comment } from "./types/comment";
import { formatRelativeTime } from "@/utils/dateUtils";

interface CommentItemProps {
  comment: Comment;
  onToggleLike: (id: string) => void;
  onToggleFlag: (id: string) => void;
  onDelete: (id: string) => void;
}

const CommentItem = ({ comment, onToggleLike, onToggleFlag, onDelete }: CommentItemProps) => {
  return (
    <div 
      className={`p-4 border rounded-lg ${comment.isFlagged ? 'bg-red-50 dark:bg-red-950/10' : ''}`}
    >
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium truncate">{comment.user.name}</p>
              <p className="text-xs text-muted-foreground">
                on <span className="font-medium">{comment.contentTitle}</span> • {formatRelativeTime(comment.createdAt)}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onToggleFlag(comment.id)}>
                  {comment.isFlagged ? 'Remove flag' : 'Flag comment'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(comment.id)} className="text-red-600">
                  Delete comment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="mt-2 text-sm">{comment.content}</p>
          <div className="mt-3 flex items-center">
            <Button 
              variant={comment.isLiked ? "default" : "ghost"} 
              size="sm"
              className="h-8 gap-1"
              onClick={() => onToggleLike(comment.id)}
            >
              <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
              {comment.likes}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-1 ml-2">
              Reply
            </Button>
            {comment.isFlagged && (
              <span className="text-xs flex items-center ml-auto text-red-600">
                <Flag className="h-3 w-3 mr-1" /> Flagged
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
