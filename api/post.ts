import { getAppWriteSDK } from '@/stores/appwrite.store';

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

// get post
export const getPostFromDatabaseApi = (postId: string) => {
  return appWriteSDK.database.getDocument('posts', postId);
};
