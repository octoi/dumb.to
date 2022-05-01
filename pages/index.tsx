import type { NextPage } from 'next';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { Layout } from '@/components/Layout';
import { UserProfile } from '@/components/home/UserProfile';
import { Posts } from '@/components/home/Posts';

const Home: NextPage = () => {
  const userState = useHookState(userStore);
  const user = userState.get();

  return (
    <Layout>
      <div className='flex flex-col md:flex-row-reverse'>
        <UserProfile user={user} />
        <Posts />
      </div>
    </Layout>
  );
};

export default Home;
