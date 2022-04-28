import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { Layout } from '@/components/Layout';
import { loadMyNotificationsApi } from '@/api/notification';
import { Notifications } from '@/components/notifications';

export interface Notification {
  $id: string;
  targetUserId: string;
  actionUserId: string;
  actionPostId: string;
  message: string;
  createdAt: number;
}

const NotificationsPage: NextPage = () => {
  const userState = useHookState(userStore);
  const user = userState.get();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;
    loadMyNotificationsApi(user.id).then((data: any) => {
      setNotifications(data?.documents);
    });
  }, [user]);

  return (
    <Layout title='Notifications'>
      <Notifications notifications={notifications} />
    </Layout>
  );
};

export default NotificationsPage;
