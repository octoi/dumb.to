import React from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { Container, Flex, IconButton, Stack } from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { GuestUserRHS } from './GuestUserRHS';
import { useState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { LoggedInUserRHS } from './LoggedInUserRHS';
import { SearchIcon } from '@chakra-ui/icons';

interface Props {
  removeMargin?: boolean;
}

export const Header: React.FC<Props> = ({ removeMargin }) => {
  const userState = useState(userStore);
  const user = userState.get();

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
            <SearchBar />
          </Flex>
          <Stack direction='row' spacing={4} align='center'>
            <Link passHref href={Paths.search}>
              <IconButton
                variant='solid'
                aria-label='Search'
                icon={<SearchIcon />}
                type='submit'
                className='block md:hidden'
              />
            </Link>
            {user ? <LoggedInUserRHS user={user} /> : <GuestUserRHS />}
          </Stack>
        </Flex>
      </Container>
    </div>
  );
};
