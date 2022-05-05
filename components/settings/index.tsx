import React from 'react';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { EditAvatar } from './EditAvatar';

export const Settings: React.FC = () => {
  const userState = useHookState(userStore);
  const user = userState.get();

  return (
    <div>
      <h2 className='text-3xl font-bold mb-5'>Settings</h2>
      {user && (
        <>
          <EditAvatar user={user} />
        </>
      )}
    </div>
  );
};
