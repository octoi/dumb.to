import { getAppWriteSDK } from '@/stores/appwrite.store';

const appWriteSDK = getAppWriteSDK();

// Upload image
export const uploadImageToStorageApi = (file: File) => {
  return appWriteSDK.storage.createFile('images', 'unique()', file, [
    'role:all',
  ]);
};

// View a file
export const getImageURLApi = (fileId: string) => {
  return appWriteSDK.storage.getFileView('images', fileId).href;
};
