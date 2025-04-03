
import { MessageSquare } from "lucide-react";

const CommentsEmptyState = () => {
  return (
    <div className="text-center py-6">
      <MessageSquare className="h-10 w-10 mx-auto text-gray-400" />
      <p className="mt-2 text-muted-foreground">No comments found</p>
    </div>
  );
};

export default CommentsEmptyState;
