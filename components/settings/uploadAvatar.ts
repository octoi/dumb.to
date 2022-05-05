import { updateUserDataInDatabaseApi } from '@/api/account';
import { getImageURLApi, uploadImageToStorageApi } from '@/api/storage';

export const uploadAvatar = (image: File | string, userId: string) => {
  return new Promise((resolve, reject) => {
    uploadImageToStorage(image)
      .then((imageURL) => {
        updateUserDataInDatabaseApi(userId, {
          profile: imageURL,
        })
          .then(() => {
            resolve(imageURL);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

const uploadImageToStorage = (image: File | string) => {
  return new Promise<string>((resolve, reject) => {
    if (typeof image === 'string') {
      resolve(image);
      return;
    }

    uploadImageToStorageApi(image)
      .then((res) => {
        const imageURL = getImageURLApi(res.$id);
        resolve(imageURL);
      })
      .catch(reject);
  });
};
