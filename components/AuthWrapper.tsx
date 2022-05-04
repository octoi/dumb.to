import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { Paths } from '@/utils/paths';
import { ReactComponent } from '@/utils/reactTypes';

// `toString()` to get the inside value
const guestUserDeniedRoutes = [
  Paths.newPost.toString(),
  Paths.settings.toString(),
  Paths.notifications.toString(),
];

export const AuthWrapper: ReactComponent = ({ children }) => {
  const userState = useState(userStore);
  const user = userState.get();

  const router = useRouter();

  useEffect(() => {
    const pathname = router.pathname;
    const isInList = guestUserDeniedRoutes.includes(pathname);

    if (!(!user && isInList)) {
      return;
    }

    let url = `${Paths.login}?next=${pathname}`;
    router.push(url);
  }, [user, router]);

  return <>{children}</>;
};
