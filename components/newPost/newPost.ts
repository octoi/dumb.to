import { savePostToDatabaseApi } from '@/api/post';
import { getImageURLApi, uploadImageToStorageApi } from '@/api/storage';

export const newPost = (
  userId: string,
  title: string,
  content: string,
  cover?: File
) => {
  return new Promise(async (resolve, reject) => {
    let imageURL;
    // upload image if file exists
    if (cover) {
      uploadImageToStorageApi(cover)
        .then((res) => {
          imageURL = getImageURLApi(res.$id);
        })
        .catch(reject);
    }

    savePostToDatabaseApi(userId, title, content, imageURL)
      .then((data) => {
        resolve(data.$id);
      })
      .catch(reject);
  });
};
