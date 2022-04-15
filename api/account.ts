import { getAppWriteSDK } from '@/stores/appwrite.store';

const appWriteSDK = getAppWriteSDK();

// REGISTER user in appwrite users
export const registerUserApi = (
  name: string,
  email: string,
  password: string
) => {
  return appWriteSDK.account.create('unique()', email, password, name);
};

// LOGIN user & create session
export const loginUserApi = (email: string, password: string) => {
  return appWriteSDK.account.createSession(email, password);
};

// GET session
export const getUserFromSessionApi = () => {
  return new Promise((resolve, reject) => {
    appWriteSDK.account
      .getSession('current')
      .then((sessionData) => {
        appWriteSDK.database
          .getDocument('users', sessionData.userId)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

// SAVE user data to appwrite database
export const saveUserDataApi = (
  userId: string,
  name: string,
  email: string,
  profile: string
) => {
  return appWriteSDK.database.createDocument(
    'users',
    userId,
    {
      name,
      email,
      profile,
    },
    ['role:all']
  );
};

// UPDATE user in appwrite users
export const updateUserNameApi = (name: string) => {
  return appWriteSDK.account.updateName(name);
};

export const updateUserEmailApi = (email: string, password: string) => {
  return appWriteSDK.account.updateEmail(email, password);
};

export const updatePasswordApi = (password: string) => {
  return appWriteSDK.account.updatePassword(password);
};

// UPDATE user in appwrite database
export const updateUserDataInDatabaseApi = (
  userId: string,
  name: string,
  email: string,
  profile: string
) => {
  return appWriteSDK.database.updateDocument('users', userId, {
    name,
    email,
    profile,
  });
};