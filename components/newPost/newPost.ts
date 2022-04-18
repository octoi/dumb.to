import { savePostToDatabaseApi } from '@/api/post';
import { getImageURLApi, uploadImageToStorageApi } from '@/api/storage';

export const newPost = (
  userId: string,
  title: string,
  content: string,
  cover?: File
) => {
  // TODO: refactor this crap
  return new Promise(async (resolve, reject) => {
    if (cover) {
      uploadImageToStorageApi(cover)
        .then((res) => {
          const imageURL = getImageURLApi(res.$id);
          savePostToDatabaseApi(userId, title, content, imageURL)
            .then((data) => {
              resolve(data.$id);
            })
            .catch(reject);
        })
        .catch(reject);
    } else {
      savePostToDatabaseApi(userId, title, content)
        .then((data) => {
          resolve(data.$id);
        })
        .catch(reject);
    }
  });
};
