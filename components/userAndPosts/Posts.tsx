import React, { useState, useEffect } from 'react';
import { UserType } from '@/stores/user.store';
import { PostType } from '@/utils/types';
import { showToast } from '@/utils/toast';
import { PostDisplay } from './PostDisplay';
import {
  getAllPostsFromDatabaseApi,
  getPostsOfUserFromDatabaseApi,
  searchAndGetPostsFromDatabaseApi,
} from '@/api/post';

interface Props {
  user: UserType | null;
  loadUserPosts?: boolean;
  query?: string;
}

export const Posts: React.FC<Props> = ({ user, loadUserPosts, query }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getPosts = () => {
    if (user && loadUserPosts) {
      return getPostsOfUserFromDatabaseApi(user.id);
    }
    if (query) {
      return searchAndGetPostsFromDatabaseApi(query);
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
        console.log(err);
        showToast('Failed to load posts', err?.message, 'error');
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, query]);

  return (
    <div className='w-full'>
      <h2 className='text-2xl md:text-3xl font-bold mb-5'>
        {query && `Searching for "${query}"`}
        {!query && <>All posts {loadUserPosts && `by ${user?.name}`}</>}
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
