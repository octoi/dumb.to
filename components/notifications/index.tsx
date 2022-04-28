import React from 'react';
import { Notification } from '../../pages/account/notifications';
import { NotificationBar } from './NotificationBar';

interface Props {
  notifications: Notification[];
}

export const Notifications: React.FC<Props> = ({ notifications }) => {
  return (
    <>
      <h2 className='text-3xl font-bold mb-5'>
        Notifications ({notifications.length})
      </h2>
      {notifications.length === 0 && <p>No notifications</p>}
      {notifications.map((notification) => (
        <NotificationBar key={notification.$id} notification={notification} />
      ))}
    </>
  );
};
