import { getAppWriteSDK } from '@/stores/appwrite.store';
import { showToast } from '@/utils/toast';

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
    createdAt: Date.now(),
  });
};

export const subscribeToNotificationApi = (currentUserId: string) => {
  appWriteSDK.subscribe('collections.notifications.documents', (data) => {
    if (data.event === 'database.documents.create') {
      let payload: any = data.payload;

      if (payload?.targetUserId === currentUserId) {
        showToast(
          `Someone ${payload?.message}`,
          'View notification page to know more',
          'info'
        );
      }
    }
  });
};
