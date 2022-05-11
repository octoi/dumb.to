import { loginUserApi, registerUserApi, saveUserDataApi } from '@/api/account';
import { setUserData } from '@/stores/user.store';

export const registerUser = (name: string, email: string, password: string) => {
  return new Promise((resolve, reject) => {
    registerUserApi(name, email, password)
      .then(() => {
        loginUserApi(email, password)
          .then((userData) => {
            let profile = `https://avatars.dicebear.com/api/initials/${encodeURI(
              name
            )}.svg`;

            saveUserDataApi(userData.userId, name, email, profile)
              .then((data) => {
                setUserData({
                  id: userData.userId,
                  name,
                  email,
                  profile,
                });
                resolve(data);
              })
              .catch((err) => {
                reject(['Failed to save user data', err.message]);
              });
          })
          .catch((err) => {
            reject(['Failed to create session', err.message]);
          });
      })
      .catch((err) => {
        reject(['Failed to register user', err.message]);
      });
  });
};
