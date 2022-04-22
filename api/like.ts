import { getAppWriteSDK } from '@/stores/appwrite.store';
import { Query } from 'appwrite';

const appWriteSDK = getAppWriteSDK();

export const getPostLikesApi = (postId: string) => {
  return appWriteSDK.database.listDocuments('likes', [
    Query.equal('postId', postId),
  ]);
};

export const likePostApi = (postId: string, userId: string) => {
  return new Promise((resolve, reject) => {
    appWriteSDK.database
      .listDocuments('likes', [
        Query.equal('userId', userId),
        Query.equal('postId', postId),
      ])
      .then((data) => {
        if (data.documents.length === 0) {
          appWriteSDK.database
            .createDocument('likes', 'unique()', {
              postId,
              userId,
            })
            .then(resolve)
            .catch(reject);
        } else {
          appWriteSDK.database
            .deleteDocument('likes', data.documents[0].$id)
            .then(resolve)
            .catch(reject);
        }
      })
      .catch(reject);
  });
};
