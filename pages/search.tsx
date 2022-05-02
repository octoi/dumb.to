import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { Layout } from '@/components/Layout';
import { UserAndPosts } from '@/components/userAndPosts';
import { Paths } from '@/utils/paths';

const Search: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const userState = useHookState(userStore);
  const user = userState.get();

  useEffect(() => {
    const { query } = router.query;

    if (!query) {
      router.push(Paths.app);
      return;
    }

    setSearchQuery(query ? query.toString() : '');
  }, [router.query]);

  return (
    <Layout title='Search' query={searchQuery}>
      {searchQuery && searchQuery.trim().length !== 0 && (
        <UserAndPosts user={user} query={searchQuery} hideUserFromSmallScreen />
      )}
    </Layout>
  );
};

/*
IDK how this work, but it works

If i access `search?query=something` using browser, it couldn't get the `query` field in query, by adding below code, idk how but it get the job done
*/
Search.getInitialProps = () => {
  return {};
};

export default Search;
