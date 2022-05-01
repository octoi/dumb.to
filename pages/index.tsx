import type { NextPage } from 'next';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { Layout } from '@/components/Layout';
import { UserAndPosts } from '@/components/userAndPosts';

const Home: NextPage = () => {
  const userState = useHookState(userStore);
  const user = userState.get();

  return (
    <Layout>
      <UserAndPosts user={user} hideUserFromSmallScreen />
    </Layout>
  );
};

export default Home;
