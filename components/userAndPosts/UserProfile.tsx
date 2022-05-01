import React from 'react';
import Link from 'next/link';
import { userStore, UserType } from '@/stores/user.store';
import { useState as useHookState } from '@hookstate/core';
import { Paths } from '@/utils/paths';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

interface Props {
  user: UserType | null;
  hideUserFromSmallScreen?: boolean;
}

export const UserProfile: React.FC<Props> = ({
  user,
  hideUserFromSmallScreen,
}) => {
  const loggedInUserState = useHookState(userStore);
  const loggedInUser = loggedInUserState.get();

  const hideUserData = user && hideUserFromSmallScreen;

  return (
    <div
      className={`bg-slate-50 p-3 rounded h-fit md:ml-5 mb-10 ${
        hideUserData && 'hidden md:block'
      }`}
    >
      <div className='flex flex-col w-full md:w-72'>
        {!user && (
          <>
            <Link passHref href={Paths.login}>
              <Button size='lg'>Login</Button>
            </Link>
            <Link passHref href={Paths.register}>
              <Button mt={3} size='lg' colorScheme='teal'>
                Create account
              </Button>
            </Link>
          </>
        )}
        {user && (
          <>
            <Flex align='center'>
              <Avatar src={user.profile} name={user.name} size='lg' />
              <Flex direction='column' ml={3}>
                <Text fontSize='2xl' fontWeight='medium'>
                  {user.name}
                </Text>
                <Text>{user.email}</Text>
              </Flex>
            </Flex>
            <Text mt={3}>{user.bio}</Text>
            {loggedInUser?.id === user.id && (
              <Link passHref href={Paths.settings}>
                <Button mt={3} size='lg' colorScheme='teal'>
                  Edit Profile
                </Button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};
