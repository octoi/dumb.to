import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { Layout } from '@/components/Layout';
import { UserAndPosts } from '@/components/userAndPosts';

const Search: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const { query } = router.query;

  const userState = useHookState(userStore);
  const user = userState.get();

  useEffect(() => {
    setSearchQuery(query?.toString() || '');
  }, [query]);

  return (
    <Layout title='Search' query={searchQuery}>
      <UserAndPosts user={user} query={searchQuery} hideUserFromSmallScreen />
    </Layout>
  );
};

export default Search;
