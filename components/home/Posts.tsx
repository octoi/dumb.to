import React, { useState, useEffect } from 'react';
import { PostType } from '@/utils/types';
import { getAllPostsFromDatabaseApi } from '@/api/post';
import { showToast } from '@/utils/toast';
import { Post } from './Post';

export const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllPostsFromDatabaseApi()
      .then((data) => {
        setPosts(data.documents as any);
        setError('');
      })
      .catch((err) => {
        showToast('Failed to load posts', err?.message, 'error');
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='w-full'>
      <h2 className='text-3xl font-bold mb-5'>All posts</h2>
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      {posts.map((post) => (
        <Post key={post.$id} post={post} />
      ))}
    </div>
  );
};
