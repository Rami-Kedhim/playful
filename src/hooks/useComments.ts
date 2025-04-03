
import { useState } from "react";
import { Comment, CommentFilterType } from "@/components/creators/dashboard/types/comment";

export const useComments = (initialComments: Comment[]) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [filter, setFilter] = useState<CommentFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter comments based on selected filter and search query
  const filteredComments = comments.filter(comment => {
    // Filter by type
    if (filter === 'flagged' && !comment.isFlagged) return false;
    if (filter === 'liked' && !comment.isLiked) return false;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        comment.content.toLowerCase().includes(query) ||
        comment.user.name.toLowerCase().includes(query) ||
        comment.contentTitle.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Like/unlike comment
  const toggleLike = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      })
    );
  };
  
  // Flag/unflag comment
  const toggleFlag = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isFlagged: !comment.isFlagged
          };
        }
        return comment;
      })
    );
  };
  
  // Delete comment
  const deleteComment = (commentId: string) => {
    setComments(prevComments => 
      prevComments.filter(comment => comment.id !== commentId)
    );
  };

  return {
    comments,
    filteredComments,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    toggleLike,
    toggleFlag,
    deleteComment
  };
};
