import { UserType } from '@/stores/user.store';
import { Paths } from '@/utils/paths';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface Props {
  user: UserType | null;
}

export const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div
      className={`bg-slate-50 p-3 rounded h-fit md:ml-5 md:mb-10 ${
        user && 'hidden md:block'
      }`}
    >
      <div className='flex flex-col w-full md:w-72'>
        {!user && (
          <>
            <Button size='lg'>Login</Button>
            <Button mt={3} size='lg' colorScheme='teal'>
              Create account
            </Button>
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
            <Link passHref href={Paths.settings}>
              <Button mt={3} size='lg' colorScheme='teal'>
                Edit Profile
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
