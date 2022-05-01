import React from 'react';
import { UserType } from '@/stores/user.store';
import { UserProfile } from './UserProfile';
import { Posts } from './Posts';

interface Props {
  user: UserType | null;
  loadUserPosts?: boolean;
  hideUserFromSmallScreen?: boolean;
}

export const UserAndPosts: React.FC<Props> = ({
  user,
  hideUserFromSmallScreen,
  loadUserPosts,
}) => {
  return (
    <div className='flex flex-col md:flex-row-reverse'>
      <UserProfile
        user={user}
        hideUserFromSmallScreen={hideUserFromSmallScreen}
      />
      <Posts user={user} loadUserPosts={loadUserPosts} />
    </div>
  );
};
