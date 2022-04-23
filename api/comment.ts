import { getAppWriteSDK } from '@/stores/appwrite.store';

const appWriteSDK = getAppWriteSDK();

export const commentOnPostApi = (
  userId: string,
  postId: string,
  comment: string
) => {
  return appWriteSDK.database.createDocument('comments', 'unique()', {
    userId,
    postId,
    comment,
  });
};
