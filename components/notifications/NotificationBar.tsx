import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserFromDatabaseApi } from '@/api/account';
import { getPostFromDatabaseApi } from '@/api/post';
import { UserType } from '@/stores/user.store';
import { Paths } from '@/utils/paths';
import { PostType } from '@/utils/types';
import { deleteNotificationApi } from '@/api/notification';
import { showToast } from '@/utils/toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { Notification } from '../../pages/account/notifications';
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import moment from 'moment';

interface Props {
  notification: Notification;
}

export const NotificationBar: React.FC<Props> = ({ notification }) => {
  const [actionUser, setActionUser] = useState<UserType | null>(null);
  const [actionPost, setActionPost] = useState<PostType | null>(null);

  const cancelRef = React.useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getUserFromDatabaseApi(notification.actionUserId)
      .then((data: any) => {
        setActionUser(data);
      })
      .catch(console.log);

    getPostFromDatabaseApi(notification.actionPostId)
      .then((data: any) => {
        setActionPost(data);
      })
      .catch(console.log);
  }, [notification]);

  const handleDeleteNotification = () => {
    deleteNotificationApi(notification.$id)
      .then(() => {
        showToast(
          'Deleted comment successfully',
          'refresh to view latest changes',
          'success'
        );
      })
      .catch((err) => {
        showToast('Failed to delete comment', err?.message, 'error');
      });
  };

  return (
    <>
      <Flex
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='mb-2 bg-slate-50 rounded border p-4'
      >
        <Flex direction='row' align='center'>
          <Avatar
            src={actionUser?.profile || notification.actionUserId}
            name={actionUser?.name || notification.actionUserId}
          />
          <Flex direction='column'>
            <p className='ml-2 text-lg text-app-text2'>
              <Link
                passHref
                href={`${Paths.user}/${notification.actionUserId}`}
              >
                <span className='font-medium text-xl text-app-text1 cursor-pointer transition-all duration-200 hover:underline'>
                  {actionUser?.name || notification.actionUserId}
                </span>
              </Link>
              <span className='mx-2'>{notification.message}</span>
              <Link
                passHref
                href={`${Paths.post}/${notification.actionPostId}`}
              >
                <span className='font-medium text-xl text-app-text1 cursor-pointer transition-all duration-200 hover:underline'>
                  {actionPost?.title || notification.actionPostId}
                </span>
              </Link>
            </p>
            <Text mt={2} className='text-app-text2'>
              {moment(notification.createdAt).fromNow()}
            </Text>
          </Flex>
        </Flex>
        <IconButton
          variant='ghost'
          colorScheme='red'
          aria-label='preview'
          icon={<AiOutlineDelete className='text-2xl' />}
          onClick={onOpen}
        />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete notification
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleDeleteNotification();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
