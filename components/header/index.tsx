import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { Container, Flex, Stack } from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { GuestUserRHS } from './GuestUserRHS';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { LoggedInUserRHS } from './LoggedInUserRHS';
import { subscribeToNotificationApi } from '@/api/notification';
import { SearchButton } from './SearchButton';

interface Props {
  removeMargin?: boolean;
  query?: string;
}

export const Header: React.FC<Props> = ({ removeMargin, query }) => {
  const userState = useHookState(userStore);
  const user = userState.get();

  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (subscribed) return;

    subscribeToNotificationApi(user?.id);
    setSubscribed(true);
  }, [user]);

  return (
    <div className={`bg-slate-50 ${!removeMargin && 'mb-10'}`}>
      <Container maxW='container.xl' py={3}>
        <Flex alignItems='center' justify='space-between'>
          <Flex alignItems='center'>
            <Link href={Paths.app} passHref>
              <img
                src='/dumb.svg'
                alt='Dumb.to'
                className='w-20 cursor-pointer'
              />
            </Link>
            <SearchBar query={query} />
          </Flex>
          <Stack direction='row' spacing={4} align='center'>
            <SearchButton />
            {user ? <LoggedInUserRHS user={user} /> : <GuestUserRHS />}
          </Stack>
        </Flex>
      </Container>
    </div>
  );
};
