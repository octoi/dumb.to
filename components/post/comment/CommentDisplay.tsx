import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useState as useHookState } from '@hookstate/core';
import { AiFillStar, AiOutlineDelete } from 'react-icons/ai';
import { userStore, UserType } from '@/stores/user.store';
import { Comment } from '.';
import { Paths } from '@/utils/paths';
import { showToast } from '@/utils/toast';
import { getUserFromDatabaseApi } from '@/api/account';
import { deleteCommentApi } from '@/api/comment';
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

interface Props {
  comment: Comment;
  postAuthorId: string;
}

export const CommentDisplay: React.FC<Props> = ({ comment, postAuthorId }) => {
  const userState = useHookState(userStore);
  const user = userState.get();

  const [commentAuthor, setCommentAuthor] = useState<UserType | null>(null);

  const cancelRef = React.useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getUserFromDatabaseApi(comment.userId).then((userData: any) => {
      setCommentAuthor(userData);
    });
  }, [comment]);

  const handleDeleteComment = () => {
    // only comment author & post author should be able to delete comment
    if (!user || !(user.id === comment.userId || user.id === postAuthorId))
      return;

    deleteCommentApi(comment.$id)
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
      <Flex key={comment.$id} direction='row' className='mb-2 md:mb-5'>
        <Avatar
          name={commentAuthor?.name || comment.userId}
          src={commentAuthor?.profile}
          mr={2}
        />
        <div className='px-4 py-2 rounded bg-slate-100 border border-app-text1 border-opacity-30'>
          <Flex direction='row' align='center' justify='space-between' mb={2}>
            <Stack direction='row' align='center'>
              <Link passHref href={`${Paths.user}/${comment.userId}`}>
                <h2 className='font-medium text-xl cursor-pointer hover:underline transition-all duration-200 flex items-center'>
                  {commentAuthor?.name || comment.userId}
                  {comment.userId === postAuthorId && (
                    <AiFillStar className='ml-1' />
                  )}
                </h2>
              </Link>
              <p className='ml-2 text-app-text2'>
                • {moment(comment.createdAt).fromNow()}
              </p>
            </Stack>
            {user &&
              (user.id === comment.userId || user.id === postAuthorId) && (
                <IconButton
                  variant='ghost'
                  colorScheme='red'
                  aria-label='preview'
                  icon={<AiOutlineDelete className='text-2xl' />}
                  onClick={onOpen}
                />
              )}
          </Flex>
          <p className='text-lg'>{comment.comment}</p>
        </div>
      </Flex>

      {/* Delete comment comment */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete post
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
                  handleDeleteComment();
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
