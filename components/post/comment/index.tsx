import React, { useEffect, useState } from 'react';
import { UserType } from '@/stores/user.store';
import { Stack } from '@chakra-ui/react';
import { getPostCommentsApi } from '@/api/comment';
import { showToast } from '@/utils/toast';
import { CommentDisplay } from './CommentDisplay';
import { NewComment } from './NewComment';

export interface Comment {
  $id: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt: number;
}

interface Props {
  postId: string;
  postAuthorId: string;
  user: UserType | null;
}

export const Comments: React.FC<Props> = ({ postId, postAuthorId, user }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostCommentsApi(postId)
      .then((comments: any) => {
        setComments(comments.documents.reverse() || []);
      })
      .catch((err) => {
        showToast('Failed to get comments', err?.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  return (
    <div>
      {user && (
        <NewComment
          postId={postId}
          userId={user.id}
          postAuthorId={postAuthorId}
        />
      )}
      <Stack mt={5}>
        <h2 className='text-xl font-medium mb-2'>
          Comments ({comments.length})
        </h2>
        {loading && <p>Loading...</p>}
        {comments.map((comment) => (
          <CommentDisplay comment={comment} postAuthorId={postAuthorId} />
        ))}
      </Stack>
    </div>
  );
};
