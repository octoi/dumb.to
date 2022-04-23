import { getAppWriteSDK } from '@/stores/appwrite.store';
import { Query } from 'appwrite';

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
    createdAt: Date.now(),
  });
};

export const getPostCommentsApi = (postId: string) => {
  return appWriteSDK.database.listDocuments('comments', [
    Query.equal('postId', postId),
  ]);
};

export const deleteCommentApi = (commentId: string) => {
  return appWriteSDK.database.deleteDocument('comments', commentId);
};
