import {
  updatePasswordApi,
  updateUserDataInDatabaseApi,
  updateUserEmailApi,
  updateUserNameApi,
} from '@/api/account';

export const updateData = (
  userId: string,
  type: 'name' | 'email' | 'password' | 'bio',
  oldData: string,
  data: string,
  dataSecond: string
) => {
  return new Promise((resolve, reject) => {
    if (oldData === data) {
      reject('There is no change between new & old data');
      return;
    }

    if (type == 'password' && data == dataSecond) {
      reject('Cannot use same password');
      return;
    }

    updateInAppWriteUsers(type, data, dataSecond)
      .then(() => {
        if (type == 'password') {
          resolve('never gonna give you up :)');
          return;
        }

        let saveData: any = {};
        saveData[type] = data;

        updateUserDataInDatabaseApi(userId, saveData)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

const updateInAppWriteUsers = (
  type: 'name' | 'email' | 'password' | 'bio',
  data: string,
  dataSecond?: string
) => {
  if (type == 'name') {
    return updateUserNameApi(data);
  }

  if (type == 'email' && dataSecond) {
    return updateUserEmailApi(data, dataSecond);
  }

  if (type == 'password' && dataSecond) {
    return updatePasswordApi(data, dataSecond);
  }

  return new Promise((resolve, reject) => {
    resolve(data);
  });
};
