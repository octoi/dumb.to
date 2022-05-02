import React from 'react';
import { UserType } from '@/stores/user.store';
import { UserProfile } from './UserProfile';
import { Posts } from './Posts';

interface Props {
  user: UserType | null;
  loadUserPosts?: boolean;
  hideUserFromSmallScreen?: boolean;
  query?: string;
}

export const UserAndPosts: React.FC<Props> = ({
  user,
  hideUserFromSmallScreen,
  loadUserPosts,
  query,
}) => {
  return (
    <div className='flex flex-col md:flex-row-reverse'>
      <UserProfile
        user={user}
        hideUserFromSmallScreen={hideUserFromSmallScreen}
      />
      <Posts user={user} loadUserPosts={loadUserPosts} query={query} />
    </div>
  );
};
