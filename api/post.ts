import { getAppWriteSDK } from '@/stores/appwrite.store';

const appWriteSDK = getAppWriteSDK();

// save post data
export const savePostToDatabaseApi = (
  userId: string,
  title: string,
  content: string,
  cover: string | undefined
) => {
  let data = cover
    ? {
        userId,
        title,
        content,
        cover,
      }
    : {
        userId,
        title,
        content,
      };

  return appWriteSDK.database.createDocument('posts', 'unique()', data, [
    'role:all',
  ]);
};
