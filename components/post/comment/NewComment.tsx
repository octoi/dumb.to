import React, { useState } from 'react';
import { commentOnPostApi } from '@/api/comment';
import { showToast } from '@/utils/toast';
import { Button, Textarea } from '@chakra-ui/react';

interface Props {
  userId: string;
  postId: string;
}

export const NewComment: React.FC<Props> = ({ userId, postId }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCommentPost = (e: any) => {
    e.preventDefault();

    setLoading(true);
    commentOnPostApi(userId, postId, comment)
      .then(() => {
        showToast(
          'Comment submitted successfully',
          'refresh to view latest changes',
          'success'
        );
        setComment('');
      })
      .catch((err) => {
        showToast('Failed to submit comment', err?.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleCommentPost}>
      <Textarea
        placeholder='Awesome post 🚀 (0/500)'
        variant='filled'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        size='lg'
        rows={2}
        mb={4}
        disabled={loading}
        maxLength={500}
        required
      />
      <Button type='submit' isLoading={loading} size='lg' colorScheme='teal'>
        Comment
      </Button>
    </form>
  );
};
