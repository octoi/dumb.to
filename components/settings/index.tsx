import React from 'react';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { EditAvatar } from './EditAvatar';
import { EditInput } from './EditInput';

export const Settings: React.FC = () => {
  const userState = useHookState(userStore);
  const user = userState.get();

  return (
    <div>
      <h2 className='text-3xl font-bold mb-5'>Settings</h2>
      {user && (
        <>
          <EditAvatar user={user} />
          <EditInput user={user} value={user.name} type='name' />
          <EditInput user={user} value={user.email} type='email' />
          <EditInput user={user} value='' type='password' />
          <EditInput user={user} value={user.bio || ''} type='bio' />
        </>
      )}
    </div>
  );
};
