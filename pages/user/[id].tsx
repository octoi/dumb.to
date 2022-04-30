import type { GetServerSideProps, NextPage } from 'next';
import type { UserType } from '@/stores/user.store';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { GSSPRedirectData } from '@/utils/constants';
import { Layout } from '@/components/Layout';
import { getUserFromDatabaseApi } from '@/api/account';
import { Avatar, Button, Flex, Heading, Text } from '@chakra-ui/react';

interface Props {
  targetUser: UserType;
}

export const UserDetailPage: NextPage<Props> = ({ targetUser }) => {
  const loggedInUserState = useHookState(userStore);
  const loggedInUser = loggedInUserState.get();

  return (
    <Layout title={targetUser.name} image={targetUser.profile}>
      <Flex direction='column' align='center'>
        <Avatar src={targetUser.profile} name={targetUser.name} size='xl' />
        <Heading size='lg' mt={3}>
          {targetUser.name.toUpperCase()}
        </Heading>
        {targetUser.bio && <Text mt={3}>{targetUser.bio}</Text>}
        {loggedInUser && loggedInUser.id === targetUser.id && (
          <Button mt={3} variant='outline'>
            Edit Profile
          </Button>
        )}
      </Flex>
    </Layout>
  );
};

export default UserDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const targetUserId = params?.id?.toString();

  if (!targetUserId) return GSSPRedirectData;

  const targetUser: any = await getUserFromDatabaseApi(targetUserId).catch(
    () => {
      return false;
    }
  );

  if (!targetUser) return GSSPRedirectData;

  let user = {
    ...targetUser,
    id: targetUser?.$id,
  };

  return {
    props: {
      targetUser: user,
    },
  };
};
