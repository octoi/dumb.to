import React, { useState, useEffect } from 'react';
import { UserType } from '@/stores/user.store';
import { PostType } from '@/utils/types';
import { showToast } from '@/utils/toast';
import { PostDisplay } from './PostDisplay';
import {
  getAllPostsFromDatabaseApi,
  getPostsOfUserFromDatabaseApi,
} from '@/api/post';

interface Props {
  user: UserType | null;
  loadUserPosts?: boolean;
}

export const Posts: React.FC<Props> = ({ user, loadUserPosts }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getPosts = () => {
    if (user && loadUserPosts) {
      return getPostsOfUserFromDatabaseApi(user.id);
    }
    return getAllPostsFromDatabaseApi();
  };

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data.documents.reverse() as any);
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
      <h2 className='text-2xl md:text-3xl font-bold mb-5'>
        All posts {loadUserPosts && `by ${user?.name}`}
      </h2>
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      {posts.map((post) => (
        <PostDisplay
          key={post.$id}
          post={post}
          author={post.userId === user?.id ? user : null}
        />
      ))}
      {!loading && !error && posts.length === 0 && <p>No post found</p>}
    </div>
  );
};
