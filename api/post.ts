import { getAppWriteSDK } from '@/stores/appwrite.store';
import { Query } from 'appwrite';

const appWriteSDK = getAppWriteSDK();

// save post data
export const savePostToDatabaseApi = (
  userId: string,
  title: string,
  content: string,
  cover?: string
) => {
  const data = {
    userId,
    title,
    content,
    createdAt: Date.now(),
    cover,
  };

  return appWriteSDK.database.createDocument('posts', 'unique()', data, [
    'role:all',
  ]);
};

// get posts
export const getAllPostsFromDatabaseApi = () => {
  return appWriteSDK.database.listDocuments('posts');
};

// search post
export const searchAndGetPostsFromDatabaseApi = (query: string) => {
  return appWriteSDK.database.listDocuments('posts', [
    Query.search('title', query),
  ]);
};

// get post
export const getPostFromDatabaseApi = (postId: string) => {
  return appWriteSDK.database.getDocument('posts', postId);
};

// get posts of a user
export const getPostsOfUserFromDatabaseApi = (
  userId: string,
  limit?: number
) => {
  return appWriteSDK.database.listDocuments(
    'posts',
    [Query.equal('userId', userId)],
    limit
  );
};

// delete post
export const deletePostFromDatabaseApi = (postId: string) => {
  return appWriteSDK.database.deleteDocument('posts', postId);
};
