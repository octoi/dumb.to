import { getUserFromSessionApi } from '@/api/account';
import { createState, Downgraded } from '@hookstate/core';

export interface UserType {
  id: string;
  name: string;
  email: string;
  profile: string;
  bio?: string;
}

export const loadDataFromSession = () => {
  getUserFromSessionApi()
    .then((data: any) => {
      setUserData({
        id: data?.$id,
        name: data?.name,
        email: data?.email,
        profile: data?.profile,
        bio: data?.bio,
      });
    })
    .catch(() => {
      console.log('Failed to load data');
    });

  return null;
};

export const userStore = createState<UserType | null>(null);

// API to SET GET REMOVE data
export const getUserData = () => {
  return userStore.attach(Downgraded).get();
};
export const setUserData = (user: UserType) => {
  userStore.set(user);
};
export const removeUserData = () => {
  userStore.set(null);
};
