import React from 'react';
import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { Settings } from '@/components/settings';

const SettingsPage: NextPage = () => {
  return (
    <Layout title='Settings'>
      <Settings />
    </Layout>
  );
};

export default SettingsPage;
