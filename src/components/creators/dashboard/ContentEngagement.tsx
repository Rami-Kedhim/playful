
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useComments } from "@/hooks/useComments";
import { MOCK_COMMENTS } from "./mockData";
import CommentFilter from "./CommentFilter";
import CommentsList from "./CommentsList";

const ContentEngagement = () => {
  const {
    filteredComments,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    toggleLike,
    toggleFlag,
    deleteComment
  } = useComments(MOCK_COMMENTS);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Content Engagement
            </CardTitle>
            <CardDescription>
              View and respond to comments on your content
            </CardDescription>
          </div>
          <CommentFilter
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </CardHeader>
      <CardContent>
        <CommentsList
          comments={filteredComments}
          onToggleLike={toggleLike}
          onToggleFlag={toggleFlag}
          onDelete={deleteComment}
        />
      </CardContent>
    </Card>
  );
};

export default ContentEngagement;
