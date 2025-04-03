
import { Comment } from "./types/comment";
import CommentItem from "./CommentItem";
import CommentsEmptyState from "./CommentsEmptyState";

interface CommentsListProps {
  comments: Comment[];
  onToggleLike: (id: string) => void;
  onToggleFlag: (id: string) => void;
  onDelete: (id: string) => void;
}

const CommentsList = ({ 
  comments, 
  onToggleLike, 
  onToggleFlag, 
  onDelete 
}: CommentsListProps) => {
  if (comments.length === 0) {
    return <CommentsEmptyState />;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onToggleLike={onToggleLike}
          onToggleFlag={onToggleFlag}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentsList;
