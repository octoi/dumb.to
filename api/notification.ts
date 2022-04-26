import { getAppWriteSDK } from '@/stores/appwrite.store';

const appWriteSDK = getAppWriteSDK();

export const notifyUserApi = (
  targetUserId: string,
  actionUserId: string,
  actionPostId: string,
  message: string
) => {
  return appWriteSDK.database.createDocument('notifications', 'unique()', {
    targetUserId,
    actionUserId,
    actionPostId,
    message,
  });
};
