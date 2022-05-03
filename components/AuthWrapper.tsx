import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { Paths } from '@/utils/paths';
import { ReactComponent } from '@/utils/reactTypes';

// `toString()` to get the inside value
const guestUserOnlyRoutes = [Paths.login.toString(), Paths.register.toString()];

export const AuthWrapper: ReactComponent = ({ children }) => {
  const userState = useState(userStore);
  const user = userState.get();

  const router = useRouter();

  useEffect(() => {
    const pathname = router.pathname;
    const isInList = guestUserOnlyRoutes.includes(pathname);

    if ((user && !isInList) || (!user && isInList)) {
      return;
    }

    router.push(Paths.app);
  }, [user, router]);

  return <>{children}</>;
};
