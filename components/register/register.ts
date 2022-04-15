import { loginUserApi, registerUserApi, saveUserDataApi } from '@/api/account';

export const registerUser = (name: string, email: string, password: string) => {
  return new Promise((resolve, reject) => {
    registerUserApi(name, email, password)
      .then(() => {
        loginUserApi(email, password)
          .then((userData) => {
            let profile = `https://avatars.dicebear.com/api/initials/${name}.svg`;

            saveUserDataApi(userData.userId, name, email, profile)
              .then((data) => {
                console.log(userData);
                console.log(data);
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
